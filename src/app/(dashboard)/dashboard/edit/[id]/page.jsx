// app/dashboard/edit/[id]/page.js
import UpdateForm from "../../_components/project/UpdateForm";

const EditPage = ({ params }) => {
  const { id } = params; // URL থেকে id টি নেওয়া হলো

  return (
    <div>
      <UpdateForm projectId={id} />
    </div>
  );
};

export default EditPage;
