import React, { useEffect } from 'react';

interface PageMetaProps {
  title: string;
  isRaw?: boolean; // If true, uses the title exactly as provided. If false, appends " | Shelly Nutrition"
}

const PageMeta: React.FC<PageMetaProps> = ({ title, isRaw = false }) => {
  useEffect(() => {
    const brandName = 'Shelly Nutrition';
    document.title = isRaw ? title : `${title} | ${brandName}`;

    // Cleanup is generally handled by the next page mounting and overwriting the title,
    // but we could reset it here if needed.
  }, [title, isRaw]);

  return null;
};

export default PageMeta;
