import React from "react";

const Profile = ({ img, text, title }) => {
  const styles = {
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "4px",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      margin: 16,
      maxWidth: 400,
      height: 400,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
    image: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
    },
    title: {
      fontSize: "24px",
      fontWeight: 500,
      margin: 0,
      padding: 0,
    },
    text: {
      fontSize: "16px",
      fontWeight: 400,
      margin: 0,
      padding: 0,
    },
  };

  return (
    <div style={styles.card}>
      <img src={img} alt={title} style={styles.image} />
      <div style={styles.CardContent}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Profile;
