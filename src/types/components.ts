export interface Component {
  cleanup?: () => void;
}

export interface QuestionComponent extends Component, HTMLDivElement {}

export interface ButtonComponent extends Component, HTMLButtonElement {}
