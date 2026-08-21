export default function Committee() {
  const coreLeaders = [
    { name: "A S Zaforullah Momtaz", role: "CONVENER", img: "/photo/convener.jpeg" },
    { name: "Dr. Nazmun Nahid", role: "CO-CONVENER", img: "/photo/co-convener.jpeg" }
  ];

  const executiveLeaders = [
    { name: "Nazia Rahman Omee", role: "PRESIDENT", img: "/photo/nazia rahman omee.jpg" },
    { name: "Hafsa Afrin Priya", role: "VICE-PRESIDENT", img: "/photo/Hafsa Priya(VP).jpeg" },
    { name: "Chowdhury Fatmi Monzur Neha", role: "GENERAL SECRETARY", img: "/photo/Chowdhury Fatmi Monzur Neha.jpg" },
    { name: "Helal Hossen Molla", role: "CHIEF MEDIA EXECUTIVE", img: "/photo/Md Helal Hossain Mollah(CME).jpeg" },
    { name: "Abdullah Al Rafi", role: "TREASURER", img: "/photo/Abdullah All Rafi.png" },
    { name: "Md. Nasiruddin Sha Rafi", role: "ORGANIZATION MANAGER", img: "/photo/Md Nasiruddin Sha Rafi.jpg" },
    { name: "Saima Ahmed Troyee", role: "MEDIA AND PUBLICATION", img: "/photo/Saima Ahmed Troyee_.jpg" },
    { name: "Imran Hossan", role: "MEDIA AND PUBLICATION", img: "/photo/Imran Hossan (Media & Publication).jpeg" },
    { name: "Mohammad Fayez Uddin Jawad", role: "SENIOR EXECUTIVE", img: "/photo/Mohammad Fayez Uddin - Senior Executive.jpg" },
    { name: "Jannatul Tajremin", role: "SENIOR EXECUTIVE", img: "/photo/Jannatul Tajremin.jpg" },
    { name: "Md. Mahfuzur Rahman", role: "JUNIOR EXECUTIVE", img: "/photo/Md Mahfuzur Rahman.jpg" },
    { name: "Tasfia Tanzum Orthy", role: "JUNIOR EXECUTIVE", img: "/photo/Tasfia Tanzum Orthy.jpeg" },
    { name: "Moatta Al Fahim", role: "JUNIOR EXECUTIVE", img: "/photo/Moatta Al Fahim(Club Representative).png" },
    { name: "Jayed Yousuf", role: "JUNIOR EXECUTIVE", img: "/photo/Jayed Yousuf(Junior executive).jpg" },
    { name: "Suborna Noor", role: "CLUB REPRESENTATIVE", img: "/photo/Suborna Noor (Club representative).jpg" },
    { name: "Linet Joachim Rozario", role: "CLUB REPRESENTATIVE", img: "/photo/LINET JOACHIM ROZARIO (Club Representative).jpg" }
  ];

  return (
    <section className="committee section fade-in" id="committee" style={{ paddingTop: "50px" }}>
      <div className="container">
        <div className="section-header text-center">
          <h2>Leadership</h2>
        </div>
        
        <div className="core-leaders mt-4">
          {coreLeaders.map((leader, i) => (
            <div className="leader-card prominent" key={i}>
              <img src={leader.img} alt={leader.role} className="leader-photo" />
              <h3 className="leader-name">{leader.name}</h3>
              <div className="leader-role">{leader.role}</div>
            </div>
          ))}
        </div>
        
        <div className="executive-leaders mt-5">
          {executiveLeaders.map((leader, i) => (
            <div className="leader-card" key={i}>
              <img src={leader.img} alt={leader.role} className="leader-photo" />
              <h3 className="leader-name">{leader.name}</h3>
              <div className="leader-role">{leader.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
