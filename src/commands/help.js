export default function helpCommand(bot) {
  bot.command("help", async (ctx) => {
    const helpMessage = `
🔥 Welcome to  CraveLU$T 🔥
Your ultimate destination for fun and entertainment! 
🎉💋 Here's how you can use me:

✨ Commands & Features:
/start - Begin your adventure with me! 💃✨
/photo - Get a exclusive random photo with available points. 🌟📸 
/video - Get a exclusive random video with available points. 📹 ✨
/gif - Get a exclusive random gif with available points. 🍒 ✨
/help - Need guidance? I’m here to assist! 🤝💡
/refer - Get a referral link to earn free points. 🔁 💎
/points - To check available points. 🏅💫

🔞 Important Rules:
18+ only: This bot is for adults only. 🚨🔞
Stay safe: No illegal or harmful activities. ⚠️🛡️

💌 Support:
If you have questions or need help, contact us at [Support Link] 📩🛠️

Let's make your experience unforgettable! 🌹💫
Enjoy responsibly and have fun! 🍸💃✨
      `;
    await ctx.reply(helpMessage);
  });
}
