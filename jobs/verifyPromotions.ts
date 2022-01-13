import cron from 'node-cron';
import { Promocion } from '../models';

//cada dia a las 24 horas verificar la validez de las promociones.
export const promotionSchedule = cron.schedule('00 00 * * * *', () => {
    console.log('Running a job at 00 : 00  at America/Managua timezone');
    verifyPromotions();
});

const verifyPromotions = async() => {
    const fechaActual = new Date();
    const promociones:Array<any> = await Promocion.find({estado : true});
  
    promociones.map(async (promocion, index)=>{
         const fechaPromo = new Date(promocion.fechaFinal)

         //verificar si la promocion ya paso
        if(fechaActual >= fechaPromo){
            promocion.estado = false;
            await promocion.save();
        }
    });  
}