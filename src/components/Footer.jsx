"use client";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container text-center">
        <div className="footer-logos mb-3">
          <span className="club-name">Robotics Club</span> | <span className="uni-name">University of Asia Pacific</span>
        </div>

        <div className="social-links mb-3">
          <a href="https://www.facebook.com/roboticsUAP.cse" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
        </div>

        <p className="footer-contact mb-2">
          <a href="mailto:roboticsclub@uap-bd.edu">roboticsclub@uap-bd.edu</a>
        </p>
        <p className="footer-location text-secondary mb-4" style={{ fontSize: '0.9rem' }}>
          7th floor, 74/A, Green Road, Farmgate Dhaka-1205, Dhaka, Bangladesh, 1205
        </p>
      </div>
      
      <div className="container-fluid px-md-5">
        <div className="footer-bottom-row">
          <p className="copyright mb-0">© 2026 Robotics Club. All rights reserved.</p>
          <div className="developer-credits">
            <p className="developer-name">
              Developed by <a href="https://imran-hossan-rahul-dev.vercel.app/" target="_blank" rel="noopener noreferrer" className="dev-link">Imran Hossan</a>
            </p>
            <p className="developer-role">
              Media and Publication • Robotics Club of UAP
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
