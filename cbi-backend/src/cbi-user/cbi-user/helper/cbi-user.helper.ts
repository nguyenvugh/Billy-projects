export const convertTotalScoresToTitleEarned = (totalScores: number) => {
  // TODO: using constant or config to store map total scores to title earned
  if (totalScores < 40) {
    return 'Ít nhận thức về khí hậu';
  } else if (totalScores <= 80) {
    return 'Nhận thức về khí hậu';
  } else {
    return 'Hành động về khí hậu';
  }
};

export const checkUserPassedCbi = (totalScores: number) => {
  // TODO: using constant or config to store minimum scores to pass
  return totalScores >= 40;
};
