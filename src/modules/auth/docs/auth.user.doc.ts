export function UserLoginDoc() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      /**
       * @swagger
       * /user/auth/login:
       *   post:
       *     tags:
       *       - Authentication
       *     summary: User login
       *     description: Allows users to log in using an email or username, and password.
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             required:
       *               - password
       *             properties:
       *               email:
       *                 type: string
       *                 format: email
       *                 description: User's email (optional)
       *               userName:
       *                 type: string
       *                 description: User's username (optional)
       *               password:
       *                 type: string
       *                 description: User's password
       *                 minLength: 1
       *     responses:
       *       200:
       *         description: Successfully logged in
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 token:
       *                   type: string
       *                   description: JWT token for accessing protected routes
       *                 user:
       *                   type: object
       *                   properties:
       *                     id:
       *                       type: integer
       *                       description: User's ID
       *                     email:
       *                       type: string
       *                       format: email
       *                       description: User's email
       *                     userName:
       *                       type: string
       *                       description: User's username
       *       422:
       *         description: Validation error - Password is required
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 message:
       *                   type: string
       *                   description: Error message indicating the missing fields
       *       500:
       *         description: Server error
       */

      const result = originalMethod.apply(this, args);
      return result;
    };
  };
}
