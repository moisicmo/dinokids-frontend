import { ComponentButton } from "@/components"
import { Stack, SvgIcon, Typography } from "@mui/material"
import { useCallback, useState } from "react";
import { ClassesCreate, ClassesTable } from ".";
import { Add } from "@mui/icons-material";
import { ClasseModel } from "@/models";

export const ClassesView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<ClasseModel | null>(null);

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null)
    setopenDialog(value);
  }, []);
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Typography variant="h6">Clases</Typography>
        <ComponentButton
          text="Nueva clase"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
      </Stack>
      <ClassesTable
        handleEdit={(v) => {
          setItemEdit(v)
          handleDialog(true)
        }}
      />
      {
        openDialog &&
        <ClassesCreate
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      }
    </>
  )
}
