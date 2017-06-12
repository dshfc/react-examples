import {info, sayHi} from './first_module'
import * as stuff from './first_module'
import { info as secret_info } from "./first_module";
import foo, * as name from "./first_module"; // name is the name of the object that will receive the imported values.


console.log(info) // woohoo!
console.log(stuff) // woohoo!
console.log(foo,name)
