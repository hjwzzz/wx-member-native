import Storage from '../../utils/storage';

export default Behavior({
  data: {
    pageStyle: `
      --main-color: ${Storage.getMainColor()};
      width: 100%;
      height: 100%;
    `,
  },
});
