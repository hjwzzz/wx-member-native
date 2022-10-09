import Storage from '../../utils/storage';

export default Behavior({
  data: {
    pageStyle: `
      --main-color: ${Storage.getMainColor()};
      width: 100%;
      height: 100%;
      padding-bottom: env(safe-area-inset-bottom);
      background: #f5f5f5;
    `,
  },
});
