import { PROFILE } from '@/router/config';

export const profileMenu = [
  {
    name: 'settings.help',
    key: 'help',
    icon: '<i class="iconfont icon-bangzhuyushuoming size-18" />',
    children: [
      {
        name: 'settings.document',
        key: 'docs',
        value: 'https://seal-io.github.io/docs/',
        icon: '<icon-book  class="size-18" />'
      },
      {
        name: 'common.footer.version',
        key: 'version',
        value: '',
        icon: '<i class="iconfont icon-version size-18" />'
      },
      {
        name: 'seal.io',
        key: 'home',
        value: 'https://www.seal.io/',
        icon: '<icon-home  class="size-18"/>'
      }
    ]
  },
  {
    name: 'settings.language',
    key: 'userCenter',
    icon: '<i class="iconfont icon-language size-18"></i>',
    children: [
      {
        name: '中文',
        key: 'chinese',
        route: PROFILE.UserCenter,
        value: 'zh-CN',
        icon: '<i class="iconfont icon-fuhao-zhongwen" />'
      },
      {
        name: 'English',
        key: 'english',
        value: 'en-US',
        icon: '<i class="iconfont icon-english" />'
      }
    ]
  },
  {
    name: 'common.cli.download',
    key: 'clidownload',
    route: 'CliDownload',
    icon: '<icon-download class="size-18"/>',
    children: [
      // {
      //   name: 'common.cli.download',
      //   key: 'clidownload',
      //   route: 'CliDownload',
      //   icon: '<icon-download />'
      // }
    ]
  },
  {
    name: 'propfile.account.user.title',
    key: 'Profile',
    icon: '<i class="iconfont icon-user1 size-18"/>',
    children: [
      {
        name: 'propfile.account.user.info',
        key: 'UserCenter',
        route: PROFILE.UserCenter,
        icon: '<icon-user />'
      },
      { name: 'messageBox.logout', key: 'logout', icon: '<icon-export/>' }
    ]
  }
];

export default {};
