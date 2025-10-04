import React, { useState } from 'react';
import {
    Table,
    Input,
    Select,
    Card,
    Typography,
    Space,
    Tag,
    Image,
    Layout,
    Button
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import toshpulatov_adxam from "../../assets/rasmlar/tashpo'latov_adxam_abdumalikovich.jpg"
import joramurodov_gafur from "../../assets/rasmlar/juramurodov_g'offur_isroilo'gli.jpg"
import xasanov_jaxongir from "../../assets/rasmlar/xasanov_jahongir_musaxono'g'li.jpg"
import akramov_sabriddin from "../../assets/rasmlar/akramov_sabriddin_asatulla o'g'li.jpg"
import xolmatov_armon from "../../assets/rasmlar/xolmatov_armon_abduxaimovich.png"
import sabirov_obidjon from "../../assets/rasmlar/sabirov_obidjon_ablimitovich.png"
import salayev_oybek from "../../assets/rasmlar/salayev_oybek_axmedjanovich.jpg"
import bardiyev_bahodir from "../../assets/rasmlar/bardayev_baxodir_palvannazirovich.jpg"
import ashurov_faxriddin from "../../assets/rasmlar/ashurov_faxriddin.jpg"
import toshpulatov_elmurod from "../../assets/rasmlar/toshpo'latov_elmurod.jpg"
import nuriddinov_shukriddin from "../../assets/rasmlar/nuriddinov_shukriddin.png"
import orzuqulov_baxtiyor from "../../assets/rasmlar/orzuqulov_baxtiyor.jpg"
import yuldashev_bobomurod from "../../assets/rasmlar/yuldashev_bobomurod.jpg"
import yakubov_orif from "../../assets/rasmlar/yakubov_orif.jpg"
import qudratullayev_doston from "../../assets/rasmlar/qudratullayev_doston.jpg"
import xosilbekov_jasur from "../../assets/rasmlar/xosilbekov_jasur.jpg"
import yusupov_akbar from "../../assets/rasmlar/yusupov_akbar.png"
import kamilov_kamaliddin from "../../assets/rasmlar/kamilov_kamoliddin.jpg"
import islomov_zarif from "../../assets/rasmlar/islomov_zarif.jpg"
import tammimov_abdulloh from "../../assets/rasmlar/tammimov_abdulloh.jpg"
import omonov_shohruh from "../../assets/rasmlar/omonov_shoxruh.jpg"
import xadjaxanov_ilhomjon from "../../assets/rasmlar/xudjaxanoov_ilhomjon.jpg"
import soipov_jasur from "../../assets/rasmlar/saipov_jasur.jpg"
import ernazarov_temurbek from "../../assets/rasmlar/ernazarov_temurbek.jpg"
import muhammadiyev_azizjon from "../../assets/rasmlar/muhammadiyev_azizjon.jpg"
import isaqov_asrorjon from "../../assets/rasmlar/isaqov_asrorjon.jpg"
import axmadov_ortiqjon from "../../assets/rasmlar/axmadov_ortiqjon.jpg"
import xolmurodov_izzatilla from "../../assets/rasmlar/xolmurodov_izzatilla.jpg"
import zakirov_nodir from "../../assets/rasmlar/zakirov_nodir.jpg"
import ruziyev_ruzimbek from "../../assets/rasmlar/ruziyev_ruzimbek.jpg"
import xalilov_donyor from "../../assets/rasmlar/xalilov_donyor.jpg"
import qoqonov_maxsud from "../../assets/rasmlar/quqonov_maxsud.png"
import pardayev_ulugbek from "../../assets/rasmlar/pardayev_ulugbek.jpg"
import abduraxmonov_rovshan from "../../assets/rasmlar/abduraxmanov_rovshan.jpg"
import abduqaxxorov_qudratilla from "../../assets/rasmlar/abduqaxxarov_qudratilla.png"
import madaminov_jaxongir from "../../assets/rasmlar/madaminov_jahongir.jpg"
import sattorov_boburjon from "../../assets/rasmlar/sattarov_boburjon.png"
import kushayev_begjigit from "../../assets/rasmlar/qushaev_begjigit.jpg"
import orazaliyev_zafar from "../../assets/rasmlar/urazaliyev_zafar.jpg"
import ishanqulov_komiljon from "../../assets/rasmlar/ishanqulov_komiljon.jpg"
import tursunov_shuxratjon from "../../assets/rasmlar/tursunov_shuxratjon.jpg"
import qodirov_umar from "../../assets/rasmlar/qodirov_umar.png"
import mansurov_nodir from "../../assets/rasmlar/mansurov_nodir.png"
import narziqulov_sodiq from "../../assets/rasmlar/narziqulov_sodiq.png"
import baxronov_olimjon from "../../assets/rasmlar/baxronov_olimjon.jpg"
import yazdanov_ulugbek from "../../assets/rasmlar/yazdanov_ulug'bek.jpg"
import narzullayev_odiljon from "../../assets/rasmlar/narzullayev_odiljon.jpg"
import sultanov_samandar from "../../assets/rasmlar/sultanov_samandar.jpg"
import turobboyev_muslimbek from "../../assets/rasmlar/turobboyev_muslimbek.jpg"
import sotvoldiyev_kamoliddin from "../../assets/rasmlar/sotvoldiyev_kamoliddin.png"
import alijanov_abbos from "../../assets/rasmlar/alijanov_abbos.png"
import tojaliyev_maxmudjon from "../../assets/rasmlar/tojaliyev_maxmudjon.png"
import obidov_asilbek from "../../assets/rasmlar/obidov_asilbek.png"
import mirzaqulov_jamshid from "../../assets/rasmlar/mirzaqulov_jamshid.png"
import mamasoliyev_elyor from "../../assets/rasmlar/mamasoliyev_elyor.png"
import akramov_ruzimuhammad from "../../assets/rasmlar/akramov_ruzimuhammad.jpg"
import satvoldiyev_nodirjon from "../../assets/rasmlar/satvoldiyev_nodirjon.jpg"
import labanov_konstantin from "../../assets/rasmlar/labanov_konstantin.jpg"
import nishonov_umarali from "../../assets/rasmlar/nishonov_umarali.jpg"
import voqsoqov_javohir from "../../assets/rasmlar/voqsoqov_javohir.png"
import axmedov_eldorbek from "../../assets/rasmlar/axmedov_eldorbek.jpg"
import qadirov_iqbol from "../../assets/rasmlar/qadirov_iqbol.jpg"
import sayidov_otabek from "../../assets/rasmlar/sayidov_otabek.jpg"
import olimjanov_shoxjahon from "../../assets/rasmlar/olimjanov_shoxjahon.jpg"
import erkayev_elyor from "../../assets/rasmlar/erkayev_elyor.png"
import urinov_saddam from "../../assets/rasmlar/urinov_saddam.jpg"
import xodjanazarov_anvar from "../../assets/rasmlar/xodjanazarov_anvar.jpg"
import ramiddinov_obid from "../../assets/rasmlar/ramiddinov_obid.jpg"
import sharmanov_sharof from "../../assets/rasmlar/sharmanov_sharof.jpg"
import yarashov_quvvat from "../../assets/rasmlar/yarashov_quvvat.jpg"
import qulmatov_akmal from "../../assets/rasmlar/qulmatov_akmal.png"
import xamidov_anvar from "../../assets/rasmlar/xamidov_anvar.png"
import tuxtapulatov_dilshod from "../../assets/rasmlar/tuxtapulatov_dilshod.png"
import shodiyev_maxmud from "../../assets/rasmlar/shodiyev_maxmud.png"
import xolmurdov_azamjon from "../../assets/rasmlar/xolmurdov_azamjon.png"
import ravshanov_bekzod from "../../assets/rasmlar/ravshanov_bekzod.png"
import masharaipov_utkir from "../../assets/rasmlar/masharaipov_utkir.png"
import jumaboyev_sarvar from "../../assets/rasmlar/jumaboyev_sarvar.png"
import ozodov_eldor from "../../assets/rasmlar/ozodov_eldor.png"
import orinboyev_baxadir from "../../assets/rasmlar/orinboyev_baxadir.png"
import kojmetov_arslon from "../../assets/rasmlar/kojmetov_arslon.png"
import sultanov_sanjar from "../../assets/rasmlar/sultanov_sanjar.png"
import erpepesov_berdimurot from "../../assets/rasmlar/erpepesov_berdimurot.png"
import oybek from "../../assets/myimage.jpg"
import javohir from "../../assets/javohir.png"



const { Title } = Typography;
const { Option } = Select;

export interface PPHLeader {
    id: number;
    photoUrl: string;
    position: string;
    rank: string;
    name: string;
    region?: string;
}
export const pphLeadersData: PPHLeader[] = [
    { id: 1, photoUrl: toshpulatov_adxam, position: 'АППХО 2-гуруҳ командири', rank: 'Капитан', name: 'Ташпулатов Адхам Абдумаликович', region: 'ИИВ ЖХД ЖТСХ Алоҳида ППХ отряди' },
    { id: 2, photoUrl: joramurodov_gafur, position: 'АППХО катта инспектори', rank: 'катта лейтенант', name: 'Журамуродов Ғаффур Исроил ўғли', region: 'ИИВ ЖХД ЖТСХ Алоҳида ППХ отряди' },
    { id: 3, photoUrl: xasanov_jaxongir, position: 'АППХО катта инспектори', rank: 'лейтенант', name: 'Хасанов Жахонгирбек Мусахон ўғли', region: 'ИИВ ЖХД ЖТСХ Алоҳида ППХ отряди' },
    { id: 4, photoUrl: akramov_sabriddin, position: 'АППХО катта инспектори', rank: 'лейтенант', name: 'Акрамов Сабриддин Асатулла ўғли', region: 'ИИВ ЖХД ЖТСХ Алоҳида ППХ отряди' },
    { id: 5, photoUrl: xolmatov_armon, position: 'Сергели ТИИОФМБ ППХО командири ўринбосари', rank: 'капитан', name: 'Холматов Армон Абдухаимович', region: 'Тошкент шаҳар' },
    { id: 6, photoUrl: sabirov_obidjon, position: 'Учтепа ТИИО ФМБ ППХ 1-отряд командири ўринбосари', rank: 'катта лейтенант', name: 'Сабиров Обиджон Аблимитович', region: 'Тошкент шаҳар' },
    { id: 7, photoUrl: salayev_oybek, position: 'Чилонзор ТИИОФМБ ППХО командирининг ММИ бўйича ўринбосари', rank: 'капитан', name: 'Салаев Ойбек Ахмеджанович', region: 'Тошкент шаҳар' },
    { id: 8, photoUrl: bardiyev_bahodir, position: 'Яккасарой ТИИОФМБ ППХО командири', rank: 'подполковник', name: 'Бардиев Баходир Палванназирович', region: 'Тошкент шаҳар' },
    { id: 9, photoUrl: ashurov_faxriddin, position: 'Янгиҳаёт ТИИОФМБ ППХО командири ўринбосари', rank: 'лейтенант', name: 'Ашуров Фахриддин Бозорович', region: 'Тошкент шаҳар' },
    { id: 10, photoUrl: toshpulatov_elmurod, position: 'Миробод ТИИОФМБ ППХО командири ўринбосари', rank: 'лейтенант', name: 'Тошпулатов Элмурод Дилмурод ўғли', region: 'Тошкент шаҳар' },
    { id: 11, photoUrl: nuriddinov_shukriddin, position: 'Олмазор ТИИОФМБ ППХО командири ўринбосари', rank: 'катта лейтенант', name: 'Нуриддинов Шукуриддин Шарофиддин ўғли', region: 'Тошкент шаҳар' },
    { id: 12, photoUrl: orzuqulov_baxtiyor, position: 'Бектемир ТИИОФМБ ППХО командири ўринбосари', rank: 'лейтенант', name: 'Орзиқулов Бахтиёр Валижон ўғли', region: 'Тошкент шаҳар' },
    { id: 13, photoUrl: yuldashev_bobomurod, position: 'Яшнобод ТИИОФМБ ППХО командири ўринбосари', rank: 'катта лейтенант', name: 'Юлдошев Бобомурод Бобоқулович', region: 'Тошкент шаҳар' },
    { id: 14, photoUrl: yakubov_orif, position: 'М.Улуғбек ТИИОФМБ ППХО командири', rank: 'капитан', name: 'Якубов Ориф Мингишевич', region: 'Тошкент шаҳар' },
    { id: 15, photoUrl: qudratullayev_doston, position: 'Шайхонтоҳур ТИИОФМБ ППХО командири ўринбосари', rank: 'лейтенант', name: 'Қудратуллаев Достон Шухратилла ўғли', region: 'Тошкент шаҳар' },
    { id: 16, photoUrl: xosilbekov_jasur, position: 'Чилонзор ТИИОФМБ ППХ 3-отряди командири', rank: 'Майор', name: 'Хосилбеков Жасур Ахматович', region: 'Тошкент шаҳар' },
    { id: 17, photoUrl: yusupov_akbar, position: 'ИИББ ППХБ командири ўринбосари', rank: 'подполковник', name: 'Юсупов Акбар Икромович', region: 'Тошкент шаҳар' },
    { id: 18, photoUrl: kamilov_kamaliddin, position: 'ИИББ ППХБ 1-МСБ 2-отряд командири', rank: 'капитан', name: 'Камилов Камолиддин Камилович', region: 'Тошкент шаҳар' },
    { id: 19, photoUrl: islomov_zarif, position: 'ИИББ ППХБ 1-МСБ 2-отряд командири ўринбосари', rank: 'лейтенант', name: 'Исломов Зариф Илхом ўғли', region: 'Тошкент шаҳар' },
    { id: 20, photoUrl: tammimov_abdulloh, position: 'ИИББ ППХБ 1-МСБ 2-отряд гуруҳ командири', rank: 'лейтенант', name: 'Таммимов Абдуллоҳ Шавкат ўғли', region: 'Тошкент шаҳар' },
    { id: 21, photoUrl: omonov_shohruh, position: 'ИИББ ППХБ 1-МСБ 3-отряд командири ўринбосари', rank: 'катта лейтенант', name: 'Омонов Шоҳруҳ Равшанжон ўғли', region: 'Тошкент шаҳар' },
    { id: 22, photoUrl: xadjaxanov_ilhomjon, position: 'ИИББ ППХБ 1-МСБ 3-отряд гуруҳ командири', rank: 'лейтенант', name: 'Хаджаханов Илхамджан Олимжанович', region: 'Тошкент шаҳар' },
    { id: 23, photoUrl: soipov_jasur, position: 'ИИББ ППХБ 2-МСБ командири', rank: 'майор', name: 'Саипов Жасур Нодир ўғли', region: 'Тошкент шаҳар' },
    { id: 24, photoUrl: ernazarov_temurbek, position: 'ИИББ ППХБ 2-МСБ 1-отряд командири', rank: 'катта лейтенант', name: 'Ерназаров Тимурбек Нурали ўғли', region: 'Тошкент шаҳар' },
    { id: 25, photoUrl: muhammadiyev_azizjon, position: 'ИИББ ППХБ 2-МСБ 2-отряд командири ўринбосари', rank: 'катта лейтенант', name: 'Мухаммадиев Азизжон Али ўғли', region: 'Тошкент шаҳар' },
    { id: 26, photoUrl: isaqov_asrorjon, position: 'ИИББ ППХБ 2-МСБ 3-отряд командири ўринбосари', rank: 'катта лейтенант', name: 'Исоқов Асроржон Аббосжон ўғли', region: 'Тошкент шаҳар' },
    { id: 27, photoUrl: axmadov_ortiqjon, position: 'ИИББ ППХБ 2-МСБ 2-отряд гурух командири', rank: 'лейтенант', name: 'Ахмадов Ортиқжон Ғайрат ўғли', region: 'Тошкент шаҳар' },
    { id: 28, photoUrl: xolmurodov_izzatilla, position: 'ИИББ ППХБ ОТДХТБ командири ўринбосари', rank: 'подполковник', name: 'Холмуродов Иззатилла Негматович', region: 'Тошкент шаҳар' },
    { id: 29, photoUrl: zakirov_nodir, position: 'ИИББ ППХБ ОТДХТБ 3-отряд командири', rank: 'подполковник', name: 'Закиров Нодир Кабилович', region: 'Тошкент шаҳар' },
    { id: 30, photoUrl: ruziyev_ruzimbek, position: 'ИИББ ППХБ ОТДХТБ 3-отряд командири ўринбосари', rank: 'капитан', name: 'Рўзиев Рўзимбек Мирzaевич', region: 'Тошкент шаҳар' },
    { id: 31, photoUrl: xalilov_donyor, position: 'ИИББ ППХБ ОТДХТБ ТҲва ҚО отряд командири ўринбосари', rank: 'лейтенант', name: 'Халилов Дониёр Фурқат ўғли', region: 'Тошкент шаҳар' },
    { id: 32, photoUrl: qoqonov_maxsud, position: 'ИИББ ППХБ ОТДХТБ 4-отряд командирининг ўринбосари', rank: 'лейтенант', name: 'Қўқонов Махсуд Шокирович', region: 'Тошкент шаҳар' },
    { id: 33, photoUrl: pardayev_ulugbek, position: 'ИИББ ППХБ ОТДХТБ Отлиқ отряд командири ўринбосари', rank: 'лейтенант', name: 'Пардаев Улуғбек Зоир огли', region: 'Тошкент шаҳар' },
    { id: 34, photoUrl: abduraxmonov_rovshan, position: 'ИИББ ППХБ командирининг хизмат бўйича ўринбосари', rank: 'подполковник', name: 'Абдурахманов Ровшан Абдусаломович', region: 'Тошкент вилояти' },
    { id: 35, photoUrl: abduqaxxorov_qudratilla, position: 'ИИББ 1-МММ ППХО командирининг хизмат бўйича ўринбосари', rank: 'капитан', name: 'Абдуқаххаров Қудиратулла Ботирали ўғли', region: 'Тошкент вилояти' },
    { id: 36, photoUrl: madaminov_jaxongir, position: 'ИИББ 2-МMM ППХО командирининг хизмат бўйича ўринбосари', rank: 'лейтенант', name: 'Мадаминов Жахонгир Мухторович', region: 'Тошкент вилояти' },
    { id: 37, photoUrl: sattorov_boburjon, position: 'ИИББ 3-МММ ППХО командирининг хизмат бўйича ўринбосари', rank: 'капитан', name: 'Саттаров Бобуржон Абдураимович', region: 'Тошкент вилояти' },
    { id: 38, photoUrl: kushayev_begjigit, position: 'ИИББ 4-МММ ППХО командирининг хизмат бўйича ўринбосари', rank: 'капитан', name: 'Кушаев Бегжигит Абдумуталович', region: 'Тошкент вилояти' },
    { id: 39, photoUrl: orazaliyev_zafar, position: 'ИИББ ППХБ ИСОМТЎХТО командири ўринбосари', rank: 'капитан', name: 'Ўразалиев Зафар Тожибоевич', region: 'Тошкент вилояти' },
    { id: 40, photoUrl: ishanqulov_komiljon, position: 'ИИБ ППХБ командирининг хизмат бўйича ўринбосари', rank: 'подполковник', name: 'Ишанкулов Комилжон Абдуалимович', region: 'Сирдарё вилояти' },
    { id: 41, photoUrl: tursunov_shuxratjon, position: 'ИИБ ППХБ 2-отряд командири', rank: 'майор', name: 'Турсунов Шухратжон Шокиржонович', region: 'Сирдарё вилояти' },
    { id: 42, photoUrl: qodirov_umar, position: 'ИИБ ППХБ командирининг хизмат бўйича ўринбосари', rank: 'подполковник', name: 'Қодиров Умар Халиқович', region: 'Жиззах вилояти' },
    { id: 43, photoUrl: mansurov_nodir, position: 'ИИБ ППХБ ИСОМТЎХТО командири', rank: 'Катта лейтенант', name: 'Мансуров Нодир Ботирович', region: 'Жиззах вилояти' },
    { id: 44, photoUrl: narziqulov_sodiq, position: 'ИИБ ППХБ туманлараро отряд командири', rank: 'лейтенант', name: 'Нарзикулов Содиқ Камолович', region: 'Жиззах вилояти' },
    { id: 45, photoUrl: baxronov_olimjon, position: 'ИИБ ППХБ командирининг хизмат бўйича ўринбосари', rank: 'подполковник', name: 'Бахронов Олимжон Хомиджонович', region: 'Самарқанд вилояти' },
    { id: 46, photoUrl: yazdanov_ulugbek, position: 'ИИБ ППХБ ИСОМТЎХТ отряди командири ўринбосари', rank: 'майор', name: 'Язданов Улуғбек Нематович', region: 'Самарқанд вилояти' },
    { id: 47, photoUrl: narzullayev_odiljon, position: 'ИИБ ППХБ 3-отряд командири', rank: 'капитан', name: 'Нарзуллаев Одилжон Абдуманнонович', region: 'Самарқанд вилояти' },
    { id: 48, photoUrl: sultanov_samandar, position: 'ИИБ ППХБ 1-отряд командири ўринбосари', rank: 'майор', name: 'Султанов Самандар Шермаматович', region: 'Самарқанд вилояти' },
    { id: 49, photoUrl: turobboyev_muslimbek, position: 'ИИБ ППХБ 4-отряд командири ўринбосари', rank: 'лейтенант', name: 'Туробов Муслимбек Жамолиддин ўғли', region: 'Самарқанд вилояти' },
    { id: 50, photoUrl: sotvoldiyev_kamoliddin, position: 'ИИБ ППХБ командири', rank: 'майор', name: 'Сотволдиев Камолиддин Олимидинович', region: 'Фарғона вилояти' },
    { id: 51, photoUrl: alijanov_abbos, position: 'ИИБ ППХБ командирининг ММИ бўйича ўринбосари', rank: 'капитан', name: 'Алижонов Аббос Махамаджон ўғли', region: 'Фарғона вилояти' },
    { id: 52, photoUrl: tojaliyev_maxmudjon, position: 'ИИБ 1-минтақавий ҳудуд ППХО командирининг хизмат бўйича ўринбосари', rank: 'капитан', name: 'Тожалиев Махмуджон Ахмаджонович', region: 'Фарғона вилояти' },
    { id: 53, photoUrl: obidov_asilbek, position: 'ИИБ ППХБ 1-гуруҳ командири', rank: 'катта лейтенант', name: 'Обидов Асилбек Умаржонович', region: 'Фарғона вилояти' },
    { id: 54, photoUrl: mirzaqulov_jamshid, position: 'ИИБ 1-минтақавий ҳудуд ППХО 5-гуруҳ командири', rank: 'капитан', name: 'Мирзоқулов Жамшид Акрамжонович', region: 'Фарғона вилояти' },
    { id: 55, photoUrl: mamasoliyev_elyor, position: 'ИИБ 2-минтақавий ҳудуд ППХО командирининг хизмат бўйича ўринбосари', rank: 'майор', name: 'Мамасолиев Элёр Турсуналиевич', region: 'Фарғона вилояти' },
    { id: 56, photoUrl: akramov_ruzimuhammad, position: 'ИИБ 2-минтақавий ҳудуд ППХО 2-гуруҳ командири', rank: 'лейтенант', name: 'Акрамов Рўзимуҳаммад Уйғунжон ўғли', region: 'Фарғона вилояти' },
    { id: 57, photoUrl: satvoldiyev_nodirjon, position: 'ЖХХ ППХБ командири ўринбосари – ИСОМТЎХТО командири', rank: 'подполковник', name: 'Сатволдиев Нодиржон Юрсунович', region: 'Фарғона вилояти' },
    { id: 58, photoUrl: labanov_konstantin, position: 'вилоят ИИБ ППХБ туманлараро отряди командири', rank: 'майор', name: 'Лобанов Константин Константинович', region: 'Наманган вилояти' },
    { id: 59, photoUrl: nishonov_umarali, position: 'Наманган шаҳар ИИБ ППХО командири', rank: 'подполковник', name: 'Нишонов Умарали Тўйчибоевич', region: 'Наманган вилояти' },
    { id: 60, photoUrl: voqsoqov_javohir, position: 'Давлатобод туман ИИБ ППХО командири', rank: 'лейтенант', name: 'Воққосов Жавохир Илхомжон ўғли', region: 'Наманган вилояти' },
    { id: 61, photoUrl: axmedov_eldorbek, position: 'ИИБ ППХБ командири ўринбосари – ИСОМТЎХТО командири', rank: 'подполковник', name: 'Ахмедов Элдорбек Маматисмоилович', region: 'Андижон вилояти' },
    { id: 62, photoUrl: qadirov_iqbol, position: 'ИИБ ППХБ 1-отряд командири', rank: 'майор', name: 'Кадиров Иқбол Хасанбоевич', region: 'Андижон вилояти' },
    { id: 63, photoUrl: sayidov_otabek, position: 'ИИБ ППХБ 3-отряд командири', rank: 'подполковник', name: 'Сайидов Отабек Махмудович', region: 'Андижон вилояти' },
    { id: 64, photoUrl: olimjanov_shoxjahon, position: 'ИИБ ППХБ 4-отряд командири ўринбосари', rank: 'лейтенант', name: 'Олимжонов Шохжахон Баходиржон ўғли', region: 'Андижон вилояти' },
    { id: 65, photoUrl: erkayev_elyor, position: 'ИИБ ППХБ командирининг таъминот бўйича ўринбосари', rank: 'майор', name: 'Эркаев Элёр Батирович', region: 'Қашқадарё вилояти' },
    { id: 66, photoUrl: urinov_saddam, position: 'ИИБ ППХБ отряд командири ўринбосари', rank: 'лейтенант', name: 'Уринов Саддам Рахматилло ўғли', region: 'Қашқадарё вилояти' },
    { id: 67, photoUrl: xodjanazarov_anvar, position: 'ИИБ ППХБ командирининг хизмат бўйича ўринбосари', rank: 'майор', name: 'Ходжаназаров Анвар Маматқосимович', region: 'Сурхондарё вилояти' },
    { id: 68, photoUrl: ramiddinov_obid, position: 'ИИБ ППХБ отряд командири', rank: 'катта лейтенант', name: 'Рамиддинов Обид Одилович', region: 'Сурхондарё вилояти' },
    { id: 69, photoUrl: sharmanov_sharof, position: 'ИИБ ППХБ ШМҲ ППХО командири', rank: 'майор', name: 'Шадмонов Шароф Раимович', region: 'Сурхондарё вилояти' },
    { id: 70, photoUrl: yarashov_quvvat, position: 'ИИБ ППХБ командирининг хизмат бўйича ўринбосари', rank: 'подполковник', name: 'Ярашов Қувват Қурбонович', region: 'Бухоро вилояти' },
    { id: 71, photoUrl: qulmatov_akmal, position: 'ИИБ ППХБ 1-туманлараро отряд командири', rank: 'капитан', name: 'Қулматов Акмал Ҳамроевич', region: 'Бухоро вилояти' },
    { id: 72, photoUrl: xamidov_anvar, position: 'ЖХХ ППХБ командири ўринбосари – махсус отряд командири', rank: 'подполковник', name: 'Ҳамидов Анвар Ҳалимович', region: 'Бухоро вилояти' },
    { id: 73, photoUrl: tuxtapulatov_dilshod, position: 'ИИБ ППХБ командирининг ММИ бўйича ўринбосари', rank: 'капитан', name: 'Тўхтапўлатов Дилшод Уйғунович', region: 'Навоий вилояти' },
    { id: 74, photoUrl: shodiyev_maxmud, position: 'ИИБ ППХБ 2-отряд командири', rank: 'подполковник', name: 'Шодиев Махмуд Ихтиёрович', region: 'Навоий вилояти' },
    { id: 75, photoUrl: xolmurdov_azamjon, position: 'ИИБ ППХБ туманлараро ППХ отряди 1-гурух командири', rank: 'лейтенант', name: 'Холмуродов Аъзамжон Анвар ўғли', region: 'Навоий вилояти' },
    { id: 76, photoUrl: ravshanov_bekzod, position: 'ИИБ ППХБ ИСОМТЎХТ отряди командирининг ўринбосари', rank: 'лейтенант', name: 'Равшанов Бекзод Ахрор ўғли', region: 'Навоий вилояти' },
    { id: 77, photoUrl: masharaipov_utkir, position: 'ИИБ ППХБ командири', rank: 'майор', name: 'Машарипов Ўткир Қурбанбоевич', region: 'Хоразм вилояти' },
    { id: 78, photoUrl: jumaboyev_sarvar, position: 'ИИБ ППХБ туманлараро отряд командири', rank: 'катта лейтенант', name: 'Жумабоев Сарвар Ойбек ўғли', region: 'Хоразм вилояти' },
    { id: 79, photoUrl: ozodov_eldor, position: 'ИИБ ППХБ командирининг таъминот бўйича ўринбосари', rank: 'капитан', name: 'Озодов Элдор Озодвич', region: 'Хоразм вилояти' },
    { id: 80, photoUrl: orinboyev_baxadir, position: 'ИИВ ППХБ командири', rank: 'подполковник', name: 'Орынбаев Бахадыр Ералиевич', region: 'Қорақалпоғистон Республикаси' },
    { id: 81, photoUrl: kojmetov_arslon, position: 'ИИВ ППХБ командирининг таъминот бўйича ўринбосари', rank: 'майор', name: 'Кожаметов Арслан Полатбаевич', region: 'Қорақалпоғистон Республикаси' },
    { id: 82, photoUrl: sultanov_sanjar, position: 'ИИВ 2-минтақавий ҳудуд ППХО командири ўринбосари', rank: 'лейтенант', name: 'Султанов Санжар Қўзибой ўғли', region: 'Қорақалпоғистон Республикаси' },
    { id: 83, photoUrl: erpepesov_berdimurot, position: 'ИИВ 1-минтақавий ҳудуд ППХО командири', rank: 'подполковник', name: 'Ерлепесов Бердимурат Кенесбаевич', region: 'Қорақалпоғистон Республикаси' },
    { id: 84, photoUrl: oybek, position: 'Dasturchi', rank: '-', name: 'Oybek Akhmadjonov', region: '-' },
    { id: 85, photoUrl: javohir, position: 'Dasturchi', rank: '-', name: 'Javohir Saidov', region: '-' }
];
const regions = Array.from(new Set(pphLeadersData.map(item => item.region))).filter(Boolean) as string[];

const ranks = Array.from(new Set(pphLeadersData.map(item => item.rank))).filter(Boolean) as string[];

const PPHLeadersTable: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [regionFilter, setRegionFilter] = useState<string>('');
    const [rankFilter, setRankFilter] = useState<string>('');

    const filteredData = pphLeadersData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.position.toLowerCase().includes(searchText.toLowerCase());
        const matchesRegion = !regionFilter || item.region === regionFilter;
        const matchesRank = !rankFilter || item.rank === rankFilter;

        return matchesSearch && matchesRegion && matchesRank;
    });

    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            width: 60,
            sorter: (a: PPHLeader, b: PPHLeader) => a.id - b.id,
        },
        {
            title: 'Фото сурати',
            dataIndex: 'photoUrl',
            key: 'photoUrl',
            width: 100,
            render: (photoUrl: string) => (
                photoUrl ?
                    <Image width={64} height={80} src={photoUrl} alt="Photo" style={{ objectFit: 'cover' }} /> :
                    <div style={{
                        width: 64,
                        height: 80,
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px dashed #d9d9d9'
                    }}>
                        <span style={{ color: '#bfbfbf' }}>Фото</span>
                    </div>
            ),
        },
        {
            title: 'Лавозими',
            dataIndex: 'position',
            key: 'position',
            sorter: (a: PPHLeader, b: PPHLeader) => a.position.localeCompare(b.position),
        },
        {
            title: 'Махсус унвони',
            dataIndex: 'rank',
            key: 'rank',
            width: 150,
            sorter: (a: PPHLeader, b: PPHLeader) => a.rank.localeCompare(b.rank),
            render: (rank: string) => (
                <Tag color="blue" style={{ whiteSpace: 'nowrap' }}>
                    {rank}
                </Tag>
            ),
        },
        {
            title: 'Ф.И.Ш.',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            sorter: (a: PPHLeader, b: PPHLeader) => a.name.localeCompare(b.name),
        },
        {
            title: 'Ҳудуд',
            dataIndex: 'region',
            key: 'region',
            width: 200,
            sorter: (a: PPHLeader, b: PPHLeader) => (a.region || '').localeCompare(b.region || ''),
            render: (region: string) => region && (
                <Tag color="green">
                    {region}
                </Tag>
            ),
        },
    ];

    return (
        <Layout style={{ padding: '24px', background: '#fff' }}>
            <Card>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
                    ППХ командирларининг ўқув курсларида иштирок этувчи раҳбар ходимлар РЎЙХАТИ
                    <div style={{ fontSize: '18px', fontWeight: 'normal', marginTop: '8px' }}>
                        (1-ўқув йиғини)
                    </div>
                </Title>

                <Space direction="vertical" size="middle" style={{ width: '100%', marginBottom: '16px' }}>
                    <Space wrap>
                        <Input
                            placeholder="Қидириш..."
                            suffix={<SearchOutlined />}
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                            style={{ width: 300 }}
                        />

                        <Select
                            placeholder="Ҳудуд бўйича фильтр"
                            value={regionFilter || undefined}
                            onChange={value => setRegionFilter(value)}
                            allowClear
                            style={{ width: 200 }}
                        >
                            {regions.map(region => (
                                <Option key={region} value={region}>
                                    {region}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            placeholder="Унвон бўйича фильтр"
                            value={rankFilter || undefined}
                            onChange={value => setRankFilter(value)}
                            allowClear
                            style={{ width: 200 }}
                        >
                            {ranks.map(rank => (
                                <Option key={rank} value={rank}>
                                    {rank}
                                </Option>
                            ))}
                        </Select>

                        <Button
                            onClick={() => {
                                setSearchText('');
                                setRegionFilter('');
                                setRankFilter('');
                            }}
                        >
                            Фильтрларни тозалаш
                        </Button>
                    </Space>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    scroll={{ x: 800 }}
                    bordered
                />
            </Card>
        </Layout>
    );
};

export default PPHLeadersTable;