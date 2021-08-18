import { GET_CAMPAIGN, GET_CAMPAIGN_ERROR } from "./type";

const INITIAL_STATE = {
  campaign: [
    {
      "id": 1,
      "title": "Feature Campaign 1",
      "layout": "layout1",
      "start_date": "2020-09-02T21:30:00.000Z",
      "end_date": "2020-09-07T05:30:00.000Z",
      "status": "ongoing",
      "campaign_contents": [
        {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "shop",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDkXeeiS3GtFjZM9qsqyyKZISAnOdfnUjp1A&usqp=CAU",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFtwOzTkzzuQmzCoFz9rTrapg2cV_OdbeBLg&usqp=CAU",
          "link": null
        },
        {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDkXeeiS3GtFjZM9qsqyyKZISAnOdfnUjp1A&usqp=CAU",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFtwOzTkzzuQmzCoFz9rTrapg2cV_OdbeBLg&usqp=CAU",
          "link": null
        }, {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 26,
          "image": "https://www.getbeamer.com/wp-content/uploads/2019/11/post_bmr-HowtodifferentiateyourSaaSproductfromyourcompetition-1024x553.png",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRStX0yRv_RVOystZbfZIXXuEsFT43GpdQWog&usqp=CAU",
          "link": null
        }
      ]
    },
    {
      "id": 2,
      "title": "Feature Campaign 1",
      "layout": "layout2",
      "start_date": "2020-09-02T21:30:00.000Z",
      "end_date": "2020-09-07T05:30:00.000Z",
      "status": "ongoing",
      "campaign_contents": [
        {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "shop",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDkXeeiS3GtFjZM9qsqyyKZISAnOdfnUjp1A&usqp=CAU",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFtwOzTkzzuQmzCoFz9rTrapg2cV_OdbeBLg&usqp=CAU",
          "link": null
        },
        {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDkXeeiS3GtFjZM9qsqyyKZISAnOdfnUjp1A&usqp=CAU",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFtwOzTkzzuQmzCoFz9rTrapg2cV_OdbeBLg&usqp=CAU",
          "link": null
        }, {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 26,
          "image": "https://www.getbeamer.com/wp-content/uploads/2019/11/post_bmr-HowtodifferentiateyourSaaSproductfromyourcompetition-1024x553.png",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRStX0yRv_RVOystZbfZIXXuEsFT43GpdQWog&usqp=CAU",
          "link": null
        }
      ]
    },
    {
      "id": 3,
      "title": "Feature Campaign 1",
      "layout": "layout3",
      "start_date": "2020-09-02T21:30:00.000Z",
      "end_date": "2020-09-07T05:30:00.000Z",
      "status": "ongoing",
      "campaign_contents": [
        {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "shop",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDkXeeiS3GtFjZM9qsqyyKZISAnOdfnUjp1A&usqp=CAU",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFtwOzTkzzuQmzCoFz9rTrapg2cV_OdbeBLg&usqp=CAU",
          "link": null
        },
        {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDkXeeiS3GtFjZM9qsqyyKZISAnOdfnUjp1A&usqp=CAU",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFtwOzTkzzuQmzCoFz9rTrapg2cV_OdbeBLg&usqp=CAU",
          "link": null
        }, {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 26,
          "image": "https://www.getbeamer.com/wp-content/uploads/2019/11/post_bmr-HowtodifferentiateyourSaaSproductfromyourcompetition-1024x553.png",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRStX0yRv_RVOystZbfZIXXuEsFT43GpdQWog&usqp=CAU",
          "link": null
        }
      ]
    },
    {
      "id": 4,
      "title": "Feature Campaign 1",
      "layout": "layout4",
      "start_date": "2020-09-02T21:30:00.000Z",
      "end_date": "2020-09-07T05:30:00.000Z",
      "status": "ongoing",
      "campaign_contents": [
        {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "shop",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDkXeeiS3GtFjZM9qsqyyKZISAnOdfnUjp1A&usqp=CAU",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFtwOzTkzzuQmzCoFz9rTrapg2cV_OdbeBLg&usqp=CAU",
          "link": null
        },
        {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDkXeeiS3GtFjZM9qsqyyKZISAnOdfnUjp1A&usqp=CAU",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFtwOzTkzzuQmzCoFz9rTrapg2cV_OdbeBLg&usqp=CAU",
          "link": null
        }, {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 26,
          "image": "https://www.getbeamer.com/wp-content/uploads/2019/11/post_bmr-HowtodifferentiateyourSaaSproductfromyourcompetition-1024x553.png",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRStX0yRv_RVOystZbfZIXXuEsFT43GpdQWog&usqp=CAU",
          "link": null
        }
      ]
    },
    {
      "id": 5,
      "title": "Feature Campaign 1",
      "layout": "layout5",
      "start_date": "2020-09-02T21:30:00.000Z",
      "end_date": "2020-09-07T05:30:00.000Z",
      "status": "ongoing",
      "campaign_contents": [
        {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "shop",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDkXeeiS3GtFjZM9qsqyyKZISAnOdfnUjp1A&usqp=CAU",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFtwOzTkzzuQmzCoFz9rTrapg2cV_OdbeBLg&usqp=CAU",
          "link": null
        },
        {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDkXeeiS3GtFjZM9qsqyyKZISAnOdfnUjp1A&usqp=CAU",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFtwOzTkzzuQmzCoFz9rTrapg2cV_OdbeBLg&usqp=CAU",
          "link": null
        }, {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 26,
          "image": "https://www.getbeamer.com/wp-content/uploads/2019/11/post_bmr-HowtodifferentiateyourSaaSproductfromyourcompetition-1024x553.png",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRStX0yRv_RVOystZbfZIXXuEsFT43GpdQWog&usqp=CAU",
          "link": null
        }
      ]
    },
    {
      "id": 6,
      "title": "PROMOTION PRODUCT",
      "layout": "layout6",
      "start_date": "2020-09-02T21:30:00.000Z",
      "end_date": "2020-09-07T05:30:00.000Z",
      "status": "ongoing",
      "campaign_contents": [
        {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "shop",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDkXeeiS3GtFjZM9qsqyyKZISAnOdfnUjp1A&usqp=CAU",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFtwOzTkzzuQmzCoFz9rTrapg2cV_OdbeBLg&usqp=CAU",
          "link": null
        },
        {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDkXeeiS3GtFjZM9qsqyyKZISAnOdfnUjp1A&usqp=CAU",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFtwOzTkzzuQmzCoFz9rTrapg2cV_OdbeBLg&usqp=CAU",
          "link": null
        }, {
          "id": 25,
          "created_at": "2020-09-03T03:40:03.000Z",
          "updated_at": "2020-09-03T03:40:03.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 26,
          "image": "https://www.getbeamer.com/wp-content/uploads/2019/11/post_bmr-HowtodifferentiateyourSaaSproductfromyourcompetition-1024x553.png",
          "link": null
        },
        {
          "id": 26,
          "created_at": "2020-09-03T04:02:35.000Z",
          "updated_at": "2020-09-03T04:02:35.000Z",
          "deleted_at": null,
          "campaignable_type": "product",
          "campaignable_id": 26,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu65Ao2gPXN-Hixrqb1mc1iHjPXwhZ_x1dgg&usqp=CAU",
          "link": null
        },
        {
          "id": 27,
          "created_at": "2020-09-03T07:27:43.000Z",
          "updated_at": "2020-09-03T07:27:43.000Z",
          "deleted_at": null,
          "campaignable_type": "category",
          "campaignable_id": 1,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRStX0yRv_RVOystZbfZIXXuEsFT43GpdQWog&usqp=CAU",
          "link": null
        }
      ]
    }
  ],
  error: false,
  errorMessage: null,
};

const HomeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CAMPAIGN:
      return {
        campaign: [...action.payload[0]],
        error: false,
        errorMessage: null,
      };
    case GET_CAMPAIGN_ERROR:
      return {
        campaign: [],
        error: true,
        errorMessage: action.payload.message,
      };
    default:
      return state;
  }
};

export default HomeReducer;
