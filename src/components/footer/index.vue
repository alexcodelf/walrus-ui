<template>
  <a-layout-footer id="footer" class="footer">
    <div class="content-wrap">
      <a-space direction="vertical" :size="4">
        <a-space class="box">
          <a-link
            v-for="(item, index) in footerLinks"
            :key="index"
            :href="item.value"
            target="_blank"
            class="item"
            >{{ $t(item.label) }}</a-link
          >
          <a-link class="item" @click="handleShowVersion">{{
            getVersion(get(versionInfo, 'server'))
          }}</a-link>
        </a-space>
        <div class="copy-right"
          >&copy;{{ new Date().getFullYear() }}
          {{ $t('settings.company') }}</div
        >
      </a-space>
    </div>
  </a-layout-footer>
</template>

<script lang="ts" setup>
  import _, { get } from 'lodash';
  import { ref, onMounted } from 'vue';
  import {
    useAppVersion,
    showVersionModal,
    versionData,
    getVersion
  } from '@/hooks/fetch-app-version';
  import useCallCommon from '@/hooks/use-call-common';
  import { useUserStore } from '@/store';

  const { route } = useCallCommon();
  const userStore = useUserStore();
  const versionInfo = ref({});
  const footerLinks = [
    { label: 'settings.help', value: 'https://seal-io.github.io/docs/' }
  ];
  const getAppVersion = async () => {
    versionInfo.value = await useAppVersion();
  };
  const handleShowVersion = () => {
    showVersionModal(versionInfo.value as versionData);
  };
  const getUserInfo = () => {
    userStore.info();
  };

  const init = () => {
    getUserInfo();
  };
  onMounted(() => {
    getAppVersion();
  });
</script>

<style lang="less" scoped>
  @footer-height: 48px;

  .footer {
    height: @footer-height;
    color: var(--color-text-2);
    text-align: center;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    background-color: #fff;

    .box {
    }

    .content-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .version {
      margin-left: 10px;
      color: rgb(var(--arcoblue-6));
      cursor: pointer;

      &:hover {
        color: rgba(var(--arcoblue-6), 0.8);
      }
    }
  }
</style>
