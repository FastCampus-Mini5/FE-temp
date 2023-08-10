
interface ItemUsername {
  username: string;
  status: 'PENDING' | 'APPROVE' | 'REJECT';
}

export const getTitleWithStatus = (item: ItemUsername): any => {
  if(item.username){
    switch (item.status) {
      case 'PENDING':
        return `${item.username} (승인 대기)`;
      case 'APPROVE':
        return `${item.username} (승인 완료)`;
      case 'REJECT':
        return `${item.username} (승인 거절)`;
      default:
        return item.username;
    }
  }
};

export const getMyTitleWithStatus = (item: ItemUsername): string => {
  switch (item.status) {
    case 'PENDING':
      return `승인대기`;
    case 'APPROVE':
      return `승인`;
    case 'REJECT':
      return `반려`;
    default:
      return `승인대기`;
  }
};