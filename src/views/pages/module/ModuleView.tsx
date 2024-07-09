import { ComponentButton } from "@/components"
import { Stack, SvgIcon, Typography } from "@mui/material"
import { useCallback, useState } from "react";
import { ModuleCreate, ModuleTable } from ".";
import { Add } from "@mui/icons-material";
import { ModuleModel } from "@/models";

export const ModuleView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<ModuleModel | null>(null);

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
        <Typography variant="h6">Módulos</Typography>
        <ComponentButton
          text="Nuevo Módulo"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
      </Stack>
      <ModuleTable
        handleEdit={(v) => {
          setItemEdit(v)
          handleDialog(true)
        }}
      />
      {
        openDialog &&
        <ModuleCreate
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      }
    </>
  )
}
