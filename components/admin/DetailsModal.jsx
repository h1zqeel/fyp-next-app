import { Modal, Box, Button,  } from "@mui/material";

import { useState } from "react";

const DetailsModal = ({modalOpen, handleModalClose, item, approveRequest, rejectRequest}) =>{

return <Modal
open={modalOpen}
onClose={handleModalClose}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
  
  <Box>

  <div className="flex h-screen justify-center items-center rounded">
        <div className="w-4/12 py-5 px-5 text-left rounded shadow-md bg-white">
        <div className="flex flex-row justify-between">
          <span className="font-bold">Name</span>
          <span className="ml-5">{item.name}</span>
        </div>
        
        <div className="flex flex-row justify-between">
          <span className="font-bold">Hospital Name</span>
          <span className="ml-5">{item.hospitalName}</span>
        </div>

        <div className="flex flex-row justify-between">
          <span className="font-bold">Email</span>
          <span className="ml-5">{item.email}</span>
        </div>
        
        <div className="flex flex-row justify-between">
          <span className="font-bold"> Hospital Email</span>
          <span className="ml-5">{item.hospitalEmail}</span>
        </div>

        <div className="flex flex-row justify-between">
          <span className="font-bold">Plan</span>
          <span className="ml-5">{item.plan}</span>
        </div>

        <div className="flex flex-row justify-between">
          <span className="font-bold">Phone</span>
          <span className="ml-5">{item.phone}</span>
        </div>

        <div className="flex flex-row justify-between">
          <span className="font-bold">Hospital Phone</span>
          <span className="ml-5">{item.hospitalPhone}</span>
        </div>

        <div className="flex flex-row justify-between">
          <span className="font-bold">Reason</span>
          <span className="ml-5">{item.why}</span>
        </div>

        <div className="flex flex-row justify-between">
          <span className="font-bold">Status</span>
          <span className="ml-5">{item.approved==0?'Waiting':item.approved==1?'Approved':'Rejected'}</span>
        </div>

        <div className="flex flex-row justify-end mt-10">
            <Button variant="text" onClick={handleModalClose}>Close</Button>
        </div>
        </div>
  </div>
  </Box>
</Modal>
}

export default DetailsModal;