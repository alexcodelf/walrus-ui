<template>
  <slTransition>
    <resizeContainer
      v-if="visible"
      v-show="visible"
      :act-edges="{ top: true }"
      class="operation-control"
      @change="handleHeightChange"
    >
      <a-tabs
        v-model:active-key="activeKey"
        type="card-gutter"
        lazy-load
        :editable="true"
        @delete="handleDelete"
      >
        <a-tab-pane v-for="item in tabs" :key="item.name" :title="item.name">
          <template #title>
            <div style="width: 150px"
              ><AutoTip :tooltip-props="{ content: item.name }">
                <span>{{ item.name }}</span>
              </AutoTip></div
            >
          </template>
          <tabTerminal
            v-if="type === 'terminal'"
            :container-id="item.name"
            :height="containerHeight"
            :node-info="item.nodeInfo"
            :data-list="item.dataList"
          ></tabTerminal>
          <tabLogs
            v-if="type === 'logs'"
            :container-id="item.name"
            :data-list="item.dataList"
            :node-info="item.nodeInfo"
            :height="containerHeight"
          ></tabLogs>
        </a-tab-pane>
        <template #extra>
          <a-button size="mini" type="text" @click="handleClose"
            ><icon-close
          /></a-button>
        </template>
      </a-tabs>
    </resizeContainer>
  </slTransition>
</template>

<script lang="ts" setup>
  import _, { min, wrap } from 'lodash';
  import {
    PropType,
    ref,
    watch,
    nextTick,
    onMounted,
    onBeforeUnmount
  } from 'vue';
  import resizeContainer from '@/components/resizeable-container/index.vue';
  import slTransition from '@/components/sl-transition/index.vue';
  import { listenerCloseControlPanel } from '../../hooks/use-close-control-panel';
  import tabTerminal from './x-terminal/tab-terminal.vue';
  import tabLogs from './tab-logs.vue';
  import { ResourceKey } from '../../config/interface';

  const props = defineProps({
    containerId: {
      type: String,
      default() {
        return '';
      }
    },
    type: {
      type: String,
      default() {
        return 'terminal';
      }
    },
    visible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    updateActive: {
      type: String,
      default() {
        return '';
      }
    },
    tabs: {
      type: Array as PropType<
        {
          dataList: ResourceKey[];
          name: string;
          id: string;
          nodeInfo: object;
        }[]
      >,
      default() {
        return [];
      }
    }
  });
  const activeKey = ref<string>('terminnal');
  const containerHeight = ref(270);
  const emits = defineEmits(['update:visible', 'update:tabs', 'delete']);

  const handleHeightChange = ({ height }) => {
    containerHeight.value = height - 100;
  };

  const handleClose = () => {
    emits('update:visible', false);
    emits('update:tabs', []);
  };
  const handleOpened = () => {
    activeKey.value = _.get(props.tabs, '0.name') || `${Date.now()}`;
  };
  const handleDelete = (key) => {
    emits('delete', key);
    nextTick(() => {
      if (activeKey.value === key) {
        activeKey.value = _.get(props.tabs, '0.name') || `${Date.now()}`;
      }
    });
  };

  watch(
    () => props.visible,
    (val) => {
      nextTick(() => {
        if (val) {
          document.body.style.overflow = 'auto';
          document.body.style.paddingBottom = '360px';
          document.body.style.height = 'max-content';
        } else {
          document.body.style.overflow = 'auto';
          document.body.style.paddingBottom = '0px';
        }
      });
    },
    {
      immediate: true
    }
  );
  watch(
    () => props.updateActive,
    (val) => {
      if (val) {
        activeKey.value = val;
      }
    }
  );
  listenerCloseControlPanel(() => {
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingBottom = '0px';
    }, 50);
  });
  onMounted(() => {
    handleOpened();
    window.addEventListener('resize', () => {
      const wrapper: HTMLElement | null =
        document.querySelector('.operation-control');
      if (wrapper) {
        wrapper.style.width = '100%';
      }
    });
  });
  // remove event listener
  onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {
      const wrapper: HTMLElement | null =
        document.querySelector('.operation-control');
      if (wrapper) {
        wrapper.style.width = '100%';
      }
    });
  });
</script>

<style lang="less" scoped>
  .operation-control {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3000;
    background-color: #fff;
    border: 1px solid var(--color-border-2);

    :deep(.arco-tabs) {
      .arco-tabs-nav {
        background-color: var(--color-fill-1);
      }

      .arco-tabs-content {
        background-color: #fff;
      }

      .arco-tabs-tab {
        margin-right: 5px;
        border-top: 0 solid transparent;
      }

      .arco-tabs-tab-active {
        background-color: #fff;
      }
    }
  }
</style>
