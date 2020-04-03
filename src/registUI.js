import Vue from "vue";
import { HappyScroll } from "vue-happy-scroll";
import {
  Input,
  Checkbox,
  RadioGroup,
  RadioButton,
  Button,
  Icon
} from "element-ui";

export default function registUI() {
  Vue.use(Input);
  Vue.use(Checkbox);
  Vue.use(RadioGroup);
  Vue.use(RadioButton);
  Vue.use(Button);
  Vue.use(Icon);
  Vue.component("happy-scroll", HappyScroll);
}
