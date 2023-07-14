import { Modal } from '@mantine/core';

interface TestimonyModalProperties {
  opened: boolean;
  close: () => void;
}

export function TestimonyModal({ opened, close }: TestimonyModalProperties) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title='Never'
      centered
      size='auto'
      withCloseButton={false}
    >
      <iframe
        width='1280'
        height='720'
        src='https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      />
    </Modal>
  );
}
