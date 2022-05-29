import { useParams } from 'react-router-dom';

import { colors } from '../../helpers/colorsBasic';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import { Button } from '../../components/Button';
import { ButtonLink } from '../../components/ButtonLink';
import Header from '../../components/Header';
import { Loading } from '../../components/Loading';
import { useEffect, useState } from 'react';
import { FuelItem } from '../../components/Fuel';
import { FuelHelper } from '../../Types/FuelTypeHelper';

export default function PostoCombustiveis() {
  const params = useParams();
  const [animated, setAnimated] = useState(false);
  const [isLoadingFuels, setLoadingFuels] = useState(false);
  const [listFuels, setListFuel] = useState<FuelHelper[]>([]);
  const [disableButton, setDisableButton] = useState(true);

  // teste para estilizar
  useEffect(() => {
    const loadFuels = async () => {
      setLoadingFuels(true);
      setListFuel([
        {
          data: {
            name: 'teste',
            value: 10.5,
            postoId: '8299f2jj9m2c9f',
          },
          isActive: false,
        },
        {
          data: {
            name: 'teste2',
            value: 10,
            postoId: '8299f2jjac9f',
          },
          isActive: false,
        },
        {
          data: {
            name: 'teste',
            value: 10.5,
            postoId: '8299f2jj9m2c9f',
          },
          isActive: false,
        },
      ]);
    };
    loadFuels();
    setLoadingFuels(false);
  }, []);

  const pickFuel = (item: FuelHelper) => {
    let templistFuels = [...listFuels];
    templistFuels.map(element => {
      if (element !== item) {
        element.isActive = false;
      } else {
        element.isActive = true;
      }
    });
    setListFuel(templistFuels);
    setDisableButton(false);
  };

  const animatedSet = () => {
    setAnimated(!animated);
  };
  setInterval(animatedSet, 10000);

  return (
    <div className='p-6'>
      <Header>
        <ButtonLink
          color={`${colors.redButton}`}
          action='/postos'
          text='voltar'>
          <SettingsBackupRestoreIcon />
        </ButtonLink>
        <Button color='#8257E6' text='Combustíveis' animated={animated}>
          <LocalGasStationIcon style={{ color: '#fff' }} />
        </Button>
      </Header>
      <div className='max-w-[900px]  rounded-md bg-bgTheme-700 h-[480px] mx-auto my-12 px-5 py-10 flex flex-col  gap-8 '>
        <div className='w-full flex items-center justify-center'>
          <h3 className='text-white font-semibold text-xl smm:text-base'>
            Selecione o seu combustível
          </h3>
        </div>
        {isLoadingFuels ? (
          <div className='w-full flex flex-col gap-1 items-center justify-center flex-1'>
            <Loading />
            <span className='text-white'>Carregando cumbustíveis...</span>
          </div>
        ) : (
          <div className='flex-1 grid grid-cols-3 gap-y-5 justify-between gap-x-6 place-items-center overflow-y-auto p-3 md:grid-cols-2 sd:grid-cols-1'>
            {listFuels?.map((item, key) => (
              <FuelItem key={key} data={item} onClick={() => pickFuel(item)} />
            ))}
          </div>
        )}
        <div
          className={`group flex items-center justify-center  ${
            disableButton ? 'pointer-events-none ' : 'pointer-events-auto '
          }`}>
          <ButtonLink
            action='/pagamento'
            color='#1FA344'
            text='pagamento'
            children={<LocalAtmIcon />}
            state={disableButton}
          />
        </div>
      </div>
    </div>
  );
}