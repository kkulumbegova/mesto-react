import { waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__logo">
        &copy; 2022 Mesto Russia
        </p>
    </footer>
  )
}