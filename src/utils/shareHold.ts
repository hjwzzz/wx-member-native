export function shareHold(data: any) {
  let hideShareItems: any = [];
  let showShareItems: any = [];
  if (data.shareChumEnabled === 'N') {
    hideShareItems = ['shareAppMessage', 'shareTimeline'];
  } else if (data.shareChumCircleEnabled === 'N') {
    hideShareItems = ['shareTimeline'];
    showShareItems = ['shareAppMessage'];
  } else {
    uni.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
  }

  if (hideShareItems.length > 0) {
    uni.hideShareMenu({ hideShareItems });
  }
  if (hideShareItems.length === 1) {
    uni.showShareMenu({ menus: showShareItems });
  }
}
// shareAppMessage
export function shareAppMessage(
  { title, path, shareObj }: any,
  name = '',
  image = ''
) {
  const {
    shareChumTitle,
    miniProgramName,
    shareChumDescribe,
    shareChumImage,
    miniAvatarUrl,
  } = shareObj;
  return {
    title: name || shareChumTitle || `${miniProgramName}-${title}`,
    desc: shareChumDescribe || `${miniProgramName}-${title}`,
    path,
    imageUrl: image || shareChumImage || miniAvatarUrl,
  };
}
// shareTimeline
export function shareTimeline({ title, path, shareObj }: any) {
  const { shareChumCircleTitle, miniProgramName, miniAvatarUrl } = shareObj;
  return {
    title: shareChumCircleTitle || `${miniProgramName}-${title}`,
    path,
    imageUrl: miniAvatarUrl,
  };
}
