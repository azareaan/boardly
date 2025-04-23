import { useState } from "react";
import styles from "./team.module.scss";

type Member = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const Team = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const addMember = () => {
    const newMember = {
      id: Date.now(),
      name,
      email,
      role,
    };
    setMembers([...members, newMember]);
    setName("");
    setEmail("");
    setRole("");
  };

  const deleteMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  return (
    <div className={styles.team}>
      <h1>مدیریت اعضا تیم</h1>

      <div className={styles.form}>
        <input
          type="text"
          placeholder="نام"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="نقش"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button onClick={addMember}>افزودن عضو</button>
      </div>

      <ul className={styles.memberList}>
        {members.map((member) => (
          <li key={member.id} className={styles.memberItem}>
            <div>
              <h3>{member.name}</h3>
              <p>{member.email}</p>
              <small>نقش: {member.role}</small>
            </div>
            <button onClick={() => deleteMember(member.id)}>حذف</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Team;
