// backgroundColor: 'rgba(148,159,177,0.2)';
// borderColor: 'rgba(148,159,177,1)';
// pointBackgroundColor: 'rgba(148,159,177,1)';
// pointBorderColor: '#fff';
// pointHoverBackgroundColor: '#fff';
// pointHoverBorderColor: 'rgba(148,159,177,0.8)';

export default class LineColor {
  backgroundColor: string;
  borderColor: string;
  pointBackgroundColor: string;
  pointBorderColor: string;
  pointHoverBackgroundColor: string;
  pointHoverBorderColor: string;
}

export const Grey: LineColor = {
  backgroundColor: 'rgba(148,159,177,0.2)',
  borderColor: 'rgba(148,159,177,1)',
  pointBackgroundColor: 'rgba(148,159,177,1)',
  pointBorderColor: '#fff',
  pointHoverBackgroundColor: '#fff',
  pointHoverBorderColor: 'rgba(148,159,177,0.8)',
};

export const Red: LineColor = {
  backgroundColor: 'rgba(67, 255, 0,0.2)',
  borderColor: 'rgba(67, 255, 0,1)',
  pointBackgroundColor: 'rgba(67, 255, 0,0.2)',
  pointBorderColor: 'rgba(67, 255, 0,0.5)',
  pointHoverBackgroundColor: 'rgba(67, 255, 0,0.2)',
  pointHoverBorderColor: 'rgba(67, 255, 0,0.2)',
};
