People spend nearly 8 hours a day sleeping, yet sleep is not a continuous and uniforme state. Indeed, there exist different sleeps which have been identified and characterized. They are referred to as **sleep stages**. Sleep scoring, *a.k.a.* sleep stage classification consists in determining sleep stages over a night to produce a *hypnogram*. Sleep scoring enables to characterize an individual way of sleep and is furthermore involved, as a preliminary exam, in the diagnosis of many sleep disorders such as insomnia or sleep apnea.

Sleep experts traditionnaly look at polysomnography (PSG) record, *i.e.* records of electroencephalograms signals (EEG), electro-occulogram (EOG), electromyogram signals (EMG) principally over a night. Then they assign to each 30s of record a sleep stage, according to a reference nomenclature: American Academy of Sleep Medicine (AASM) rules for instance [Iber2007]. AASM rules exhibit 5 sleep stages: Wake (W), Rapid Eye Movement (REM), NREM1 (N1), NREM2 (N2), NREM3 (N3) *a.k.a.* Deep Sleep. They are associated to different time and frequency patterns that may occur both in EEG, EOG or EMG modalities.

In this competition, Morpheo challenges machine learners to use PSG records, containing several modalities, to predict sleep stages over PSG data recorded on new subjects.

## Evaluation

Several metrics have been proposed in the literature to quantify the performances of predictive models. In this competition, predictions are evaluated for each testing subject separately thanks to the [Cohen Kappa Score](http://scikit-learn.org/stable/modules/generated/sklearn.metrics.cohen_kappa_score.html)

## Data

The dataset for this competition comes from the [MESA dataset](https://sleepdata.org/datasets/mesa). It is composed of PSG records from several subjects written under the **.hdf5** format (although `.hdf5` extension has been omitted in file name for simplicity).
Each data file contains the hypnogram, in the right order, under the key "stages".
The corresponding time series are given with keys indicating the modality and the channel (`EEG1`, `EEG2`, `EEG3`, `EKG`, `EMG`, `EOG-L`, `EOG-L`) .

**150** records are used for training and **100** for testing.

MESA data documentation can be found [here](https://sleepdata.org/datasets/mesa/pages/equipment/montage-and-sampling-rate-information.md) and [here](https://sleepdata.org/datasets/mesa/files/documentation/MESA_Sleep_Data_Documentation_Guide.pdf).

**Caution:** Polytechnique and Rythm got the agreement to use MESA data, but these data must not be given to people not involved in the Morpheo project.

## How to submit?

### 0. Getting started

Download the [starting kit here](https://storage.cloud.google.com/mesa_starting_kit/mesa_starting_kit.tar.gz?_ga=1.218895327.773593531.1497863845) (if you don't have the right of access, [send us an email](mailto:camille.marini@polytechnique.edu).
The starting kit contains:
- submission examples (`example_sklearn` and `example_keras` folders)
- sample data (`data` folder)
- script to test your submission (`test_submission` folder)

[Install docker](https://docs.docker.com/get-started).


### 1. Create your submission

You can start from one of the submission examples:
- [features-based](https://github.com/MorpheoOrg/hypnogram-wf/tree/master/docker_submission/example_sklearn)
- [deep learning](https://github.com/MorpheoOrg/hypnogram-wf/tree/master/docker_submission/example_keras)

Pay attention, your model will be trained on 6 batches of 25 records sequentially and should compliant with online-learning.

A submission is made of a **dockerfile** and **other script files**. Requirements for a submission are the following (the image being built with `docker build -t docker-submission .`):
- To run the image to train or update the model with data in `path` (train data in `path/train/` and called `train_uuid` and test data in `path/test` and called `test_uuid`, remark that `.hdf5` extension has been removed for simplicity):
  ```
  docker run -v path:/data docker-submission -V /data -T train
  ```
  It must:
  - **save the model** in `path/model/` so that next call to this model will use the trained model.
  - **create predictions for data** in `path/test/test_uuid` files and `path/train/train_uuid` files and save them in `path/test/pred/pred_test_uuid` files and `path/train/pred/pred_train_uuid` files. **Predictions must be class probabilities**.
- To run the image to make predictions for data in `path/test/test_uuid` files:
  ```
  docker run -v path:/data docker-submission -V /data -T predict
  ```
  It must **save the predictions** in `path/test_pred/pred_test_uuid` files.

**It assumes the architecture of files described [here](https://morpheoorg.github.io/morpheo/modules/learning.html#folders).**

> For instance, the features-based submission example is made as follows (or the deep learning example):
> - python script files whose main must be run as follows to be trained or to create predictions:
> ```
> python3 submission_sklearn_hypnogram.py -V <path_to_starting_kit>/data/submission_data -T train/predict
> ```
> - a dockerfile, which takes as entrypoint
> ```
> ENTRYPOINT ["python", "/submission_sklearn_hypnogram.py"]`
> ```
> so that it can be run on *Compute* with `docker run -v path:/data docker-submission -V /data -T train/predict` as defined above.

### 2. Test your submission

From the starting kit directory, go to `test_submission` directory and run:
```
bash test_submission.sh <path_to_your_submission>
```
with `<path_to_your_submission>` being the path to the folder containing your submission (Dockerfile and associated script files).

If you see the `==== CONGRATULATIONS! Your submission can be sucessfully trained! ====` message, you can go to step 3 :-)

### 3. Compress your submission and submit it!

Compress your submission files (at least a **dockerfile** and **other script files**) into a `tar.gz` file. The name of this `tar.gz` file will be the name of your submission:
```
tar cvzf my_super_submission.tar.gz Dockerfile submission_file_1.py ...
```
Be **careful not to compress a folder containing your files**, but to put files directly into the `tar.gz`.

Go to [Analytics](https://analytics.morpheo.io/problem/) website, select the *mesa* problem page. Drag and drop your `tar.gz`.

### 4. What happens next?

Your submission is trained on the Morpheo platform [as described here](https://morpheoorg.github.io/morpheo/modules/learning.html#training-on-morpheo).

You can check your performances on Analytics leaderboard!


## Note for challenge organizers

See [here](./problem_definition.md) for details about how to define the problem workflow.


## References

[^Iber2007]: Iber, C., Ancoli-Israel, S., Chesson, A., & Quan, S. F. (2007). The AASM Manual for the Scoring of Sleep and Associated Events: Rules, Terminology and Technical Specification. Journal of Clinical Sleep Medicine.

