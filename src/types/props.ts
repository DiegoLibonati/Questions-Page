// interface DefaultProps {
//   className?: string;
//   children?: string;
// }

export interface QuestionProps {
  id: string;
  title: string;
  description: string;
  onClick: (e: MouseEvent, id: string) => void;
}
