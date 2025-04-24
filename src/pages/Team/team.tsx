import React, { useState } from "react";
import TeamMemberForm, { TeamMemberInput } from "../../components/TeamMember/TeamMemberForm";
import styles from "./Team.module.scss";

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMemberInput[]>([]);

  const handleAddMember = (data: TeamMemberInput) => {
    setTeamMembers([...teamMembers, data]);
  };

  const handleDeleteMember = (name: string) => {
    setTeamMembers(teamMembers.filter(member => member.name !== name));
  };

  return (
    <div className={styles.teamManagement}>
      <h1>مدیریت اعضای تیم</h1>
      <TeamMemberForm onSubmit={handleAddMember} />

      <div className={styles.teamList}>
        <h2>اعضای تیم</h2>
        <ul>
          {teamMembers.map((member, index) => (
            <li key={index} className={styles.teamMember}>
              <div>
                <p>نام: {member.name}</p>
                <p>نقش: {member.role}</p>
              </div>
              <button
                onClick={() => handleDeleteMember(member.name)}
                className={styles.deleteButton}
              >
                حذف
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamManagement;
