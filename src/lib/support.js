export function copyToClipboard(text, toast, prompt) {
    navigator.clipboard.writeText(text)
      .then(() => {
            toast({
                title: `${prompt} copied to Clipboard!`,
                variant: 'subtle',
                status: 'info',
            })
      })
}