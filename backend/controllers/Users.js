import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/UserModel.js';

// 🔐 ENV
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// 🔑 Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cari user
    const user = await Users.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Cek password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Wrong password' });

    // Buat Access & Refresh Token
    const accessToken = jwt.sign(
      { id: user.id, username: user.username, role: user.account_type },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' } // Access Token 15 menit
    );

    const refreshToken = jwt.sign(
      { id: user.id, username: user.username, role: user.account_type },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' } // Refresh Token 7 hari
    );

    // Simpan refresh token di DB
    await Users.update({ refreshToken }, { where: { id: user.id } });

    // Simpan refresh token di cookie (HttpOnly)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true jika HTTPS
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 hari
    });

    // Kirim Access Token ke client
    res.json({
      message: 'Login successful',
      accessToken
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get Current User (Protected)
export const me = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.sendStatus(403);

      const user = await Users.findByPk(decoded.id, {
        attributes: ['id', 'fullname', 'username', 'account_type', 'app_type', 'email', 'lastLogin', 'avatar']
      });

      if (!user) return res.sendStatus(404);
      res.json({ user });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 🔄 Refresh Token
export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const user = await Users.findOne({ where: { refreshToken } });
    if (!user) return res.sendStatus(403);

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);

      const accessToken = jwt.sign(
        { id: user.id, username: user.username, role: user.account_type },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 🚪 Logout
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    const user = await Users.findOne({ where: { refreshToken } });
    if (!user) return res.sendStatus(204);

    // Hapus refresh token di DB
    await Users.update({ refreshToken: null }, { where: { id: user.id } });

    // Hapus cookie
    res.clearCookie('refreshToken');
    return res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
