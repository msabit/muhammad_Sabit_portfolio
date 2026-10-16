const ENDPOINT = "https://api.web3forms.com/submit";

export function buildMailto(to, { name, email, message }) {
  const subject = `Portfolio contact from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Without a Web3Forms access key the caller falls back to the visitor's email app.
export async function submitContact(form, { key, fetchImpl = fetch }) {
  if (!key) return { status: "mailto" };
  try {
    const res = await fetchImpl(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: `Portfolio contact from ${form.name}`,
        from_name: form.name,
        ...form,
      }),
    });
    const data = await res.json();
    if (res.ok && data.success) return { status: "sent" };
    return { status: "error", message: data.message || "The message could not be sent." };
  } catch {
    return { status: "error", message: "Network error. Check your connection and try again." };
  }
}
