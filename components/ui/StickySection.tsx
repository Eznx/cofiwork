interface Props {
  children: React.ReactNode;
}

export default function StickySection({ children }: Props) {
  return <div className="sticky top-20 h-fit">{children}</div>;
}