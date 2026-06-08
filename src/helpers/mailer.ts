import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import { randomBytes } from 'crypto';

export const sendEmail = async({ email, emailType, userId }: any) => {
    try {
        const token = randomBytes(32).toString('hex');
        const expiry = Date.now() + 3600000; // 1 hour

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: token,
                verifyTokenExpiry: expiry,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: expiry,
            });
        }

        const transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST!,
            port: Number(process.env.EMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER!,
                pass: process.env.EMAIL_PASS!,
            },
        });

        const isReset = emailType === "RESET";
        const link = isReset
            ? `${process.env.DOMAIN}/resetpassword?token=${token}`
            : `${process.env.DOMAIN}/verifyemail?token=${token}`;

        const mailOptions = {
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: email,
            subject: isReset ? "Reset your Grit AI password" : "Verify your Grit AI email",
            html: `
                <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;">
                    <h2 style="margin:0 0 8px;font-size:22px;color:#111;">
                        ${isReset ? "Reset your password" : "Verify your email"}
                    </h2>
                    <p style="color:#555;margin:0 0 24px;line-height:1.6;">
                        ${isReset
                            ? "Click the button below to set a new password. This link expires in 1 hour."
                            : "Click the button below to verify your email address. This link expires in 1 hour."}
                    </p>
                    <a href="${link}" style="display:inline-block;padding:12px 24px;background:#F97316;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
                        ${isReset ? "Reset Password" : "Verify Email"}
                    </a>
                    <p style="color:#999;margin:24px 0 0;font-size:13px;">
                        Or copy this link into your browser:<br/>
                        <span style="color:#555;word-break:break-all;">${link}</span>
                    </p>
                    <p style="color:#bbb;margin:16px 0 0;font-size:12px;">
                        If you didn't request this, ignore this email. Your account is safe.
                    </p>
                </div>
            `,
        };

        return await transport.sendMail(mailOptions);
    } catch (error: any) {
        throw new Error("Email sending failed");
    }
};
