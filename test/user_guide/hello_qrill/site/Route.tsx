import { defineRoute, indexPage } from "qrilljs/server";
import { HomePage } from "./HomePage";

export default defineRoute([indexPage("/", HomePage)]);
