import { Bot } from "grammy";
import Config from "./config/config.js";

//Import Middlewares
import updateCommandUsage from "./middlewares/updateCommandUsage.js";
import checkCommand from "./middlewares/checkCommand.js";
import checkRegistration from "./middlewares/checkRegistration.js"; //can be potentially removed as the user cant access the bot without registering anyway
import antiSpam from "./middlewares/antiSpam.js";

//Import Handlers
import videoHandler from "./handlers/videoHandler.js";
import photoHandler from "./handlers/photoHandler.js";
import gifHandler from "./handlers/gifHandler.js";
import documentHandler from "./handlers/documentHandler.js";

//Import Commands
import startCommand from "./commands/start.js";
import pointsCommand from "./commands/points.js";
import helpCommand from "./commands/help.js";
import referCommand from "./commands/refer.js";
import checkGroup from "./middlewares/checkGroup.js";
import videoCommand from "./commands/video.js";
import gifCommand from "./commands/gif.js";
import photoCommand from "./commands/photo.js";

Config();

//Create a new bot instance
const bot = new Bot(process.env.BOT_TOKEN);

//Call all the middlewares
bot.use(checkGroup); //checks if the group is allowed or not
// bot.use(antiSpam); //checks if the user is spamming or not
// bot.use(checkRegistration); //checks if the user is registered or not
// bot.use(checkCommand); //checks if the command is valid or not
// bot.use(updateCommandUsage); //updates the command usage in database

//Register all the commands
startCommand(bot);
pointsCommand(bot);
helpCommand(bot);
referCommand(bot);
videoCommand(bot);
gifCommand(bot);
photoCommand(bot);

//Register all the handlers
videoHandler(bot);
photoHandler(bot);
gifHandler(bot);
documentHandler(bot);

//export the bot instance
export { bot };
