import { App } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import Icon from '@arco-design/web-vue/es/icon-component';
import AutoTooltip from '@arco-design/web-vue/es/_components/auto-tooltip/auto-tooltip';
import ExpandTransition from '@arco-design/web-vue/es/_components/transition/expand-transition';
import ComCard from '@/components/page-wrap/com-card.vue';
import SpinCard from '@/components/page-wrap/spin-card.vue';
import ModuleCard from '@/components/page-wrap/module-card.vue';
import BreadWrapper from '@/components/bread-wrapper/index.vue';
import { BarChart, LineChart, PieChart, GaugeChart } from 'echarts/charts';
import {
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent
} from 'echarts/components';
import Chart from './chart/index.vue';
import Breadcrumb from './breadcrumb/index.vue';
import GroupTitle from './group-title/index.vue';

const IconFont = Icon.addFromIconFontCn({
  src: '//at.alicdn.com/t/c/font_3892962_afduj5v4eah.js'
});
// Manually introduce ECharts modules to reduce packing size

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  GaugeChart,
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent
]);

export default {
  install(Vue: App) {
    Vue.component('Chart', Chart);
    Vue.component('Breadcrumb', Breadcrumb);
    Vue.component('IconFont', IconFont);
    Vue.component('AutoTip', AutoTooltip);
    Vue.component('CollapseTransition', ExpandTransition);
    Vue.component('ComCard', ComCard);
    Vue.component('SpinCard', SpinCard);
    Vue.component('ModuleCard', ModuleCard);
    Vue.component('BreadWrapper', BreadWrapper);
    Vue.component('GroupTitle', GroupTitle);
  }
};
