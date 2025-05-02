import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/redux";
import { addMember, editMember, removeMember } from "../../redux/slices/teamSlice";
import TeamMemberForm from "../../components/TeamMember/TeamMemberForm";
import { TeamMemberInput } from "../../types/type";
import styles from "./team.module.scss";

const Team: React.FC = () => {
  const dispatch = useDispatch();
  const teamMembers = useSelector((state: RootState) => state.team.members);

  const [editingMember, setEditingMember] = useState<TeamMemberInput | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddOrEditMember = (data: TeamMemberInput) => {
    if (editingMember) {
      dispatch(editMember(data));  // dispatch از Redux
    } else {
      dispatch(addMember(data));
    }
    setEditingMember(null);
    setIsFormOpen(false);
  };

  const handleEditClick = (member: TeamMemberInput) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (name: string) => {
    dispatch(removeMember(name));
  };

  return (
    <div className={styles.teamPage}>
      <h1>مدیریت اعضای تیم</h1>

      <button className={styles.addBtn} onClick={() => { setIsFormOpen(true); setEditingMember(null); }}>
        افزودن عضو جدید
      </button>

      {isFormOpen && (
        <TeamMemberForm
          onSubmit={handleAddOrEditMember}
          defaultValues={editingMember || undefined}
        />
      )}

      <div className={styles.memberList}>
        {teamMembers.length > 0 ? (
          teamMembers.map((member, index) => (
            <div key={index} className={styles.memberCard}>
              <p><strong>نام:</strong> {member.name}</p>
              <p><strong>نقش:</strong> {member.role}</p>

              <div className={styles.actions}>
                <button onClick={() => handleEditClick(member)}>ویرایش</button>
                <button onClick={() => handleDeleteClick(member.name)}>حذف</button>
              </div>
            </div>
          ))
        ) : (
          <p>عضوی یافت نشد.</p>
        )}
      </div>
    </div>
  );
};

export default Team;
