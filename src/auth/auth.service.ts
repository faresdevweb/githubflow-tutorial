import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { loginDTO, registerDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async register(registerDTO: registerDTO) {
    const { email, username, password } = registerDTO;

    const hashedPassword = await argon.hash(password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: email,
          username: username,
          hashedPassword: hashedPassword,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Email or username already taken');
        }
      }
      throw new Error(error);
    }
  }

  async login(loginDTO: loginDTO) {
    const { email, password } = loginDTO;
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      const validPassword = await argon.verify(user.hashedPassword, password);
      if (!validPassword) throw new BadRequestException('Invalid password');
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Invalid email');
        }
      }
    }
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email: email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      secret: secret,
      expiresIn: '15m',
    });

    return { access_token: token };
  }
}
