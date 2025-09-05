interface TB303LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function TB303Layout({ children, modal }: TB303LayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
