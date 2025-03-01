import React from 'react';

const SideBySideImages = ({ image1, image2, alt1 = "Image 1", alt2 = "Image 2" }) => {
  return (
    <div style={styles.container}>
      <img src={image1} alt={alt1} style={styles.image} />
      <img src={image2} alt={alt2} style={styles.image} />
    </div>
  );
};

const styles = {
  container: {
    // display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '5px', // Adjust spacing between images
    flexDirection: "row"
  },
  image: {
    // maxWidth: '60%', // Adjust image width
    maxHeight: '45%',
  },
};

export default SideBySideImages;
