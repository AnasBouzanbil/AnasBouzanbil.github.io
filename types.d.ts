interface Window {
  emailjs: {
    init: (options: { publicKey: string }) => void
    sendForm: (
      serviceId: string,
      templateId: string,
      form: HTMLFormElement,
      publicKey: string,
    ) => Promise<{ text: string }>
  }
}

