import Vue from "vue";
import { HappyScroll } from "vue-happy-scroll";
import {
  Input,
  Checkbox,
  RadioGroup,
  RadioButton,
  Button,
  Icon,
  Container,
  Header,
  Aside,
  Menu,
  MenuItem,
  Submenu,
  Main,
  Tooltip,
  Avatar,
  Row,
  Col,
  Dialog,
  Message,
  Loading,
  Table,
  TableColumn,
  Switch,
  Pagination,
  Upload,
  Select,
  Option,
  InputNumber,
  DatePicker
} from "element-ui";

Vue.prototype.$message = Message;

export default function registUI() {
  Vue.use(Input);
  Vue.use(Checkbox);
  Vue.use(RadioGroup);
  Vue.use(RadioButton);
  Vue.use(Button);
  Vue.use(Icon);
  Vue.use(Container);
  Vue.use(Header);
  Vue.use(Aside);
  Vue.use(Menu);
  Vue.use(MenuItem);
  Vue.use(Submenu);
  Vue.use(Main);
  Vue.use(Tooltip);
  Vue.use(Avatar);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Dialog);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Switch);
  Vue.use(Pagination);
  Vue.use(Upload);
  Vue.use(Select);
  Vue.use(Option);
  Vue.use(InputNumber);
  Vue.use(DatePicker);
  Vue.use(Loading.directive);
  Vue.prototype.$loading = Loading.service;
  Vue.component("happy-scroll", HappyScroll);
}
