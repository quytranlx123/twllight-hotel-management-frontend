import { useRef } from 'react';

const useScrollTo = () => {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { sectionRef, scrollToSection };
};

export default useScrollTo;
