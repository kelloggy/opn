import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const registrationSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password too short' }),
  name: z.string().nonempty({ message: 'Name is required' }),
  dob: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  gender: z.enum(['male', 'female', 'other'], { message: 'Invalid gender' }),
  address: z.string().nonempty({ message: 'Address is required' }),
});

export const updateSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password too short' }),
  name: z.string(),
  dob: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  gender: z.enum(['male', 'female', 'other'], { message: 'Invalid gender' }),
  address: z.string(),
});

export const passwordSchema = z.object({
  password: z.string().min(6, { message: 'Password too short' }),
});

export const validate =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          errors: err.errors.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      next(err);
    }
  };
