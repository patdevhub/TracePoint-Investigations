import { useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Detective AI here, your investigation assistant. What do you need to know about the case? Ask me about the case, suspects or evidence."
    }
  ]);

  function getResponse(text) {
    const message = text.toLowerCase();

    if (/\b(hi|hello|hey)\b/.test(message)) {
      return "Hi! This is DetectiveAI How can I help you? Ask me about the case, suspects or evidence.";
    }

    if (message.includes("investigation")) {
      return "This investigation is about a missing prototype that disappeared from a secure research laboratory between 22:00 and 00:00. Three people had access to the lab that night: Alex Morgan, Jamie Smith and Taylor Williams. Your job is to review the evidence, decide who is most likely responsible, and submit your conclusion.";
    }

    if (message.includes("case")) {
      return "The case is 'The Missing Prototype'. A technology prototype disappeared from a secure research laboratory.";
    }

    if (message.includes("why")) {
      if (message.includes("alex")) {
        return "Alex Morgan is suspected because Alex developed the software used by the prototype and had direct access to the research laboratory.";
      }

      if (message.includes("jamie")) {
        return "Jamie Smith is suspected because Jamie's access card was used to enter the research laboratory at 23:41, shortly before the prototype disappeared.";
      }

      if (message.includes("taylor")) {
        return "Taylor Williams is suspected because Taylor worked with the research team and had access to the laboratory during working hours, and a partial fingerprint matching someone who regularly works there was found on the prototype cabinet.";
      }

      return "Alex Morgan is suspected due to having developed the prototype's software and having lab access. Jamie Smith is suspected because their access card was used to enter the lab at 23:41, right before the incident. Taylor Williams is suspected due to regular lab access and a partial fingerprint match near the storage cabinet. Ask me about a specific suspect for more detail.";
    }

    if (message.includes("suspect")) {
      return "There are three suspects: Alex Morgan, Jamie Smith and Taylor Williams.";
    }

    if (message.includes("alex")) {
      return "Alex Morgan is a Software Developer. Alex developed the software used by the prototype and had access to the laboratory.";
    }

    if (message.includes("jamie")) {
      return "Jamie Smith is a Security Officer. Jamie was responsible for security at the building on the night of the incident.";
    }

    if (message.includes("taylor")) {
      return "Taylor Williams is a Research Assistant who worked with the research team and had access to the laboratory during working hours.";
    }

    if (message.includes("evidence")) {
      return "There are five evidence items: Security Access Log, CCTV Report, Fingerprint Report, Email Message and Photograph.";
    }

    if (message.includes("cctv")) {
      return "The CCTV Report shows a person entering the laboratory at approximately 23:43, but the person's face cannot be clearly identified.";
    }

    if (message.includes("fingerprint")) {
      return "A partial fingerprint was found on the prototype storage cabinet. It belongs to a person who regularly works in the laboratory.";
    }

    if (message.includes("email")) {
      return "An email sent shortly before the incident states that the prototype must be moved before tomorrow's demonstration.";
    }

    if (message.includes("time") || message.includes("23:41")) {
      return "The Security Access Log records an access card being used to enter the research laboratory at 23:41. CCTV then shows a person entering at approximately 23:43.";
    }

    return "I can help you with information about the case, suspects and evidence.";
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!question.trim()) {
      return;
    }

    const userMessage = {
      sender: "user",
      text: question
    };

    const botMessage = {
      sender: "bot",
      text: getResponse(question)
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      botMessage
    ]);

    setQuestion("");
  }

  /* =====================================================
     CHATBOT CLOSED
     ===================================================== */

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        style={{
          position: "fixed",
          right: "25px",
          bottom: "25px",
          width: "65px",
          height: "65px",
          borderRadius: "50%",
          border: "3px solid #f59e0b",
          backgroundColor: "#212124",
          color: "white",
          fontSize: "30px",
          cursor: "pointer",
          zIndex: 999999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 5px 25px rgba(0,0,0,0.7)"
        }}
      >
        🤖
      </button>
    );
  }

  /* =====================================================
     CHATBOT OPEN
     ===================================================== */

  return (
    <div
      style={{
        position: "fixed",
        right: "25px",
        bottom: "25px",
        width: "360px",
        height: "500px",
        backgroundColor: "#212124",
        border: "2px solid #f59e0b",
        borderRadius: "12px",
        boxShadow: "0 10px 35px rgba(0,0,0,0.7)",
        zIndex: 999999,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          padding: "18px",
          backgroundColor: "#18181b",
          borderBottom: "1px solid #33333a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >

        <div>
          <strong
            style={{
              display: "block",
              color: "#f4f4f5",
              fontSize: "16px"
            }}
          >
            TracePoint Assistant
          </strong>

          <span
            style={{
              display: "block",
              marginTop: "4px",
              color: "#fbbf24",
              fontSize: "12px"
            }}
          >
            Investigation Support
          </span>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          type="button"
          style={{
            margin: "0",
            padding: "0",
            width: "30px",
            height: "30px",
            background: "transparent",
            border: "none",
            color: "#a1a1aa",
            fontSize: "24px",
            cursor: "pointer"
          }}
        >
          ×
        </button>

      </div>

      {/* MESSAGES */}

      <div
        style={{
          flex: "1",
          padding: "15px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          backgroundColor: "#18181b"
        }}
      >

        {messages.map((message, index) => (

          <div
            key={index}
            style={{
              alignSelf:
                message.sender === "user"
                  ? "flex-end"
                  : "flex-start",

              maxWidth: "80%",

              padding: "10px 13px",

              borderRadius: "8px",

              fontSize: "14px",

              lineHeight: "1.5",

              backgroundColor:
                message.sender === "user"
                  ? "#d97706"
                  : "#27272a",

              color: "white"
            }}
          >
            {message.text}
          </div>

        ))}

      </div>

      {/* INPUT */}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "8px",
          padding: "12px",
          backgroundColor: "#212124",
          borderTop: "1px solid #33333a"
        }}
      >

        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about the investigation..."
          style={{
            flex: "1",
            minWidth: "0",
            padding: "11px",
            border: "1px solid #3f3f46",
            borderRadius: "6px",
            backgroundColor: "#18181b",
            color: "white",
            outline: "none"
          }}
        />

        <button
          type="submit"
          style={{
            margin: "0",
            width: "45px",
            minWidth: "45px",
            padding: "0",
            backgroundColor: "#d97706",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ➤
        </button>

      </form>

    </div>
  );
}

export default Chatbot;