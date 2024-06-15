import kaboom from "kaboom";
import { scale } from "./constants";

export const k = kaboom({
    width: 256 * scale,
    height: 144 * scale,
    scale,
    letterbox: true,
    global: false,
});
