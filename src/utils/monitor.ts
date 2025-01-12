import { App, ComponentPublicInstance, h, compile } from 'vue';
import axios from 'axios';
import { Modal, Message, Button } from '@arco-design/web-vue';
import i18n from '@/locale/index';

export default function handleError(Vue: App, baseUrl: string) {
  if (!baseUrl) {
    return;
  }
  Vue.config.errorHandler = (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => {
    // send error info
    axios.post(`${baseUrl}/report-error`, {
      err,
      instance,
      info
      // location: window.location.href,
      // message: err.message,
      // stack: err.stack,
      // browserInfo: getBrowserInfo(),
      // user info
      // dom info
      // url info
      // ...
    });
  };
}

export const deleteModal = async ({
  onOk,
  onCancel,
  content,
  maskClosable,
  title = 'common.delete.tips',
  okText = 'common.button.delete',
  cancelText = 'common.button.cancel'
}: {
  onOk: () => void;
  onCancel?: () => void;
  content?: string;
  title?: string;
  okText?: string;
  maskClosable?: boolean;
  cancelText?: string;
}) => {
  const modalInstance = Modal.warning({
    alignCenter: false,
    top: '20%',
    width: 450,
    hideCancel: false,
    maskClosable,
    title: i18n.global.t(title),
    content: () => {
      return h(
        'div',
        {
          style: {
            'text-align': 'center',
            'white-space': 'pre-wrap',
            'line-height': 1.6
          }
        },
        i18n.global.t(content || '')
      );
    },
    footer: () => {
      return h('div', {}, [
        h(
          Button,
          {
            type: 'primary',
            onClick: () => {
              onOk();
              modalInstance?.close?.();
            }
          },
          i18n.global.t(okText)
        ),
        h(
          Button,
          {
            type: 'outline',
            onClick: () => {
              onCancel?.();
              modalInstance?.close?.();
            }
          },
          i18n.global.t(cancelText)
        )
      ]);
    },
    okText: i18n.global.t(okText),
    cancelText: i18n.global.t(cancelText),
    onOk
  });
};

export const execSucceed = (message?: string) => {
  Message.success(i18n.global.t(message || 'common.message.success'));
};
export const execError = (message?: string) => {
  Message.error(i18n.global.t(message || 'common.message.error'));
};
