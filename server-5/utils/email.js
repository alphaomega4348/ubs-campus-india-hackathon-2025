const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    try {
        console.log("📩 Email Options:", options);

        if (!options.email || options.email.trim() === "") {
            throw new Error("❌ Email recipient is missing or empty!");
        }

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"book4All" <${process.env.EMAIL}>`,
            to: options.email.trim(),
            subject: options.subject,
            html: options.html,
        };

        console.log("📧 Sending email to:", mailOptions.to);

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.response);

        return info;
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw error;
    }
};

module.exports = sendEmail;
